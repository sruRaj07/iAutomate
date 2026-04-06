import { z } from 'zod'
import {
  createAutomations,
  deleteAutomation,
  deleteKeyword,
  deleteListener,
  deletePosts,
  deleteTrigger,
  saveKeyword,
  saveListener,
  savePosts,
  saveTrigger,
  updateAutomationName,
} from '@/actions/automations'
import { useMutationData } from './use-mutation-data'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useQueryAutomation } from './user-queries'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useCreateAutomation = (id?: string) => {
  const { isPending, mutate } = useMutationData(
    ['create-automation'],
    () => createAutomations(id),
    'user-automations'
  )

  return { isPending, mutate }
}

export const useEditAutomation = (automationId: string) => {
  const [edit, setEdit] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const enableEdit = () => setEdit(true)
  const disableEdit = () => setEdit(false)

  const { isPending, mutate } = useMutationData(
    ['update-automation'],
    (data: { name: string }) =>
      updateAutomationName(automationId, { name: data.name }),
    'automation-info',
    disableEdit
  )

  useEffect(() => {
    function handleClickOutside(this: Document, event: MouseEvent) {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node | null)
      ) {
        if (inputRef.current.value !== '') {
          mutate({ name: inputRef.current.value })
        } else {
          disableEdit()
        }
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return {
    edit,
    enableEdit,
    disableEdit,
    inputRef,
    isPending,
  }
}

export const useListener = (id: string) => {
  const { data } = useQueryAutomation(id)
  const [draftListener, setDraftListener] = useState<
    'MESSAGE' | 'SMARTAI' | null | undefined
  >(undefined)
  const [draftPrompt, setDraftPrompt] = useState<string | undefined>(undefined)
  const [draftReply, setDraftReply] = useState<string | undefined>(undefined)

  const listener = draftListener ?? data?.data?.listener?.listener ?? null
  const prompt = draftPrompt ?? data?.data?.listener?.prompt ?? ''
  const reply = draftReply ?? data?.data?.listener?.commentReply ?? ''

  const { isPending, mutate } = useMutationData(
    ['create-lister'],
    (values: { prompt: string; reply: string }) =>
      saveListener(id, listener || 'MESSAGE', values.prompt, values.reply),
    'automation-info',
    () => {
      setDraftListener(undefined)
      setDraftPrompt(undefined)
      setDraftReply(undefined)
    }
  )

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const parsed = z
      .object({
        prompt: z.string().min(1),
        reply: z.string(),
      })
      .safeParse({ prompt, reply })

    if (!parsed.success) {
      toast('Error', {
        description: 'Prompt is required',
      })
      return
    }

    mutate(parsed.data)
  }

  const onSetListener = (type: 'SMARTAI' | 'MESSAGE') => setDraftListener(type)
  const onPromptChange = (value: string) => setDraftPrompt(value)
  const onReplyChange = (value: string) => setDraftReply(value)

  const { mutate: removeListener, isPending: isRemoving } = useMutationData(
    ['delete-listener'],
    () => deleteListener(id),
    'automation-info',
    () => {
      setDraftListener(undefined)
      setDraftPrompt(undefined)
      setDraftReply(undefined)
    }
  )

  return {
    onSetListener,
    onFormSubmit,
    listener,
    prompt,
    reply,
    onPromptChange,
    onReplyChange,
    isPending,
    removeListener,
    isRemoving,
  }
}

export const useTriggers = (id: string) => {
  const { data } = useQueryAutomation(id)
  const [draftTypes, setDraftTypes] = useState<string[] | undefined>(undefined)
  const types = draftTypes ?? data?.data?.trigger?.map((item) => item.type) ?? []

  const onSetTrigger = (type: 'COMMENT' | 'DM') =>
    setDraftTypes((prevDraft) => {
      const prev =
        prevDraft ?? data?.data?.trigger?.map((item) => item.type) ?? []
      return prev.includes(type)
        ? prev.filter((item) => item !== type)
        : [...prev, type]
    })

  const { isPending, mutate } = useMutationData(
    ['add-trigger'],
    (data: { types: string[] }) => saveTrigger(id, data.types),
    'automation-info',
    () => setDraftTypes(undefined)
  )

  const onSaveTrigger = () => mutate({ types })

  const { mutate: clearTrigger, isPending: isDeleting } = useMutationData(
    ['delete-trigger'],
    () => deleteTrigger(id),
    'automation-info',
    () => setDraftTypes(undefined)
  )

  return { types, onSetTrigger, onSaveTrigger, isPending, clearTrigger, isDeleting }
}

export const useKeywords = (id: string) => {
  const [keyword, setKeyword] = useState('')
  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setKeyword(e.target.value)

  const { mutate } = useMutationData(
    ['add-keyword'],
    (data: { keyword: string }) => saveKeyword(id, data.keyword),
    'automation-info',
    () => setKeyword('')
  )

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      mutate({ keyword })
      setKeyword('')
    }
  }

  const { mutate: deleteMutation } = useMutationData(
    ['delete-keyword'],
    (data: { id: string }) => deleteKeyword(data.id),
    'automation-info'
  )

  return { keyword, onValueChange, onKeyPress, deleteMutation }
}

export const useAutomationPosts = (id: string) => {
  const { data } = useQueryAutomation(id)
  const [draftPosts, setDraftPosts] = useState<
    {
      postid: string
      caption?: string
      media: string
      mediaType: 'IMAGE' | 'VIDEO' | 'CAROSEL_ALBUM'
    }[]
    | undefined
  >(undefined)
  const posts =
    draftPosts ??
    data?.data?.posts.map((post) => ({
      postid: post.postid,
      caption: post.caption ?? undefined,
      media: post.media,
      mediaType: post.mediaType,
    })) ??
    []

  const onSelectPost = (post: {
    postid: string
    caption?: string
    media: string
    mediaType: 'IMAGE' | 'VIDEO' | 'CAROSEL_ALBUM'
  }) => {
    setDraftPosts((prevDraft) => {
      const prevItems =
        prevDraft ??
        data?.data?.posts.map((item) => ({
          postid: item.postid,
          caption: item.caption ?? undefined,
          media: item.media,
          mediaType: item.mediaType,
        })) ??
        []
      if (prevItems.find((p) => p.postid === post.postid)) {
        return prevItems.filter((item) => item.postid !== post.postid)
      } else {
        return [...prevItems, post]
      }
    })
  }

  const { mutate, isPending } = useMutationData(
    ['attach-posts'],
    () => savePosts(id, posts),
    'automation-info',
    () => setDraftPosts(undefined)
  )

  const { mutate: clearPosts, isPending: isDeleting } = useMutationData(
    ['delete-posts'],
    () => deletePosts(id),
    'automation-info',
    () => setDraftPosts(undefined)
  )

  return { posts, onSelectPost, mutate, isPending, clearPosts, isDeleting }
}

export const useDeleteAutomation = (id: string, redirectPath?: string) => {
  const router = useRouter()
  const client = useQueryClient()

  const mutation = useMutation({
    mutationKey: ['delete-automation'],
    mutationFn: () => deleteAutomation(id),
    onSuccess: async (data) => {
      toast(data?.status === 200 ? 'Success' : 'Error', {
        description: data?.data,
      })

      await client.invalidateQueries({ queryKey: ['user-automations'] })
      await client.invalidateQueries({ queryKey: ['automation-info'] })

      if (data?.status === 200) {
        if (redirectPath) {
          router.push(redirectPath)
        }
        router.refresh()
      }
    },
  })

  return {
    deleteAutomation: mutation.mutate,
    isDeleting: mutation.isPending,
  }
}

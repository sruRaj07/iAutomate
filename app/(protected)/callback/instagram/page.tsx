import { onIntegrate } from '@/actions/integrations'
import { redirect } from 'next/navigation'

type Props = {
  searchParams: Promise<{
    code?: string
    error?: string
  }>
}

const Page = async ({ searchParams }: Props) => {
  const { code } = await searchParams

  if (code) {
    const result = await onIntegrate(code.split('#_')[0])

    if (result?.status === 200 && result.data) {
      const dashboardSlug = `${result.data.firstname ?? ''}${result.data.lastname ?? ''}`

      return redirect(
        `/dashboard/${dashboardSlug}/integrations`
      )
    }
  }

  return redirect('/dashboard')
}

export default Page

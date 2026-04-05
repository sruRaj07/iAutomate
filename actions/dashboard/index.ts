'use server'

import { getAutomations } from '@/actions/automations/queries'
import { onCurrentUser } from '@/actions/user'
import { findUser } from '@/actions/user/queries'

type InstagramMediaInsight = {
  id: string
  caption?: string
  media_type: 'IMAGE' | 'VIDEO' | 'CAROSEL_ALBUM'
  media_url: string
  thumbnail_url?: string
  timestamp: string
  permalink?: string
  comments_count?: number
  like_count?: number
}

const monthLabel = (date: Date) =>
  date.toLocaleString('en-US', { month: 'short' })

export const getDashboardAnalytics = async () => {
  const user = await onCurrentUser()
  const [profile, automationsResult] = await Promise.all([
    findUser(user.id),
    getAutomations(user.id),
  ])

  const automations = automationsResult?.automations || []
  const activeAutomations = automations.filter((automation) => automation.active)
  const listeners = automations
    .map((automation) => automation.listener)
    .filter((listener): listener is NonNullable<typeof automations[number]['listener']> => Boolean(listener))

  const totalKeywords = automations.reduce(
    (sum, automation) => sum + automation.keywords.length,
    0
  )
  const totalReplies = listeners.reduce(
    (sum, listener) => sum + listener.dmCount + listener.commentCount,
    0
  )
  const totalDmReplies = listeners.reduce(
    (sum, listener) => sum + listener.dmCount,
    0
  )
  const totalCommentReplies = listeners.reduce(
    (sum, listener) => sum + listener.commentCount,
    0
  )
  const smartAiAutomations = listeners.filter(
    (listener) => listener.listener === 'SMARTAI'
  ).length

  const integration = profile?.integrations.find(
    (item) => item.name === 'INSTAGRAM'
  )

  let recentPosts: InstagramMediaInsight[] = []
  let profileMetrics = {
    username: integration?.instagramUsername || null,
    displayName: integration?.instagramDisplayName || null,
    avatarUrl: integration?.instagramAvatarUrl || null,
    mediaCount: 0,
    followersCount: null as number | null,
    followsCount: null as number | null,
  }

  if (integration?.token) {
    try {
      const profileRes = await fetch(
        `${process.env.INSTAGRAM_BASE_URL}/me?fields=user_id,username,media_count,followers_count,follows_count&access_token=${integration.token}`,
        { cache: 'no-store' }
      )
      const mediaRes = await fetch(
        `${process.env.INSTAGRAM_BASE_URL}/me/media?fields=id,caption,media_type,media_url,thumbnail_url,timestamp,permalink,comments_count,like_count&limit=12&access_token=${integration.token}`,
        { cache: 'no-store' }
      )

      const [profileJson, mediaJson] = await Promise.all([
        profileRes.json(),
        mediaRes.json(),
      ])

      if (profileRes.ok) {
        profileMetrics = {
          username: profileJson.username || profileMetrics.username,
          displayName:
            integration.instagramDisplayName ||
            profileJson.username ||
            profileMetrics.displayName,
          avatarUrl: profileMetrics.avatarUrl,
          mediaCount: Number(profileJson.media_count || 0),
          followersCount:
            typeof profileJson.followers_count === 'number'
              ? profileJson.followers_count
              : null,
          followsCount:
            typeof profileJson.follows_count === 'number'
              ? profileJson.follows_count
              : null,
        }
      }

      if (mediaRes.ok && Array.isArray(mediaJson.data)) {
        recentPosts = mediaJson.data as InstagramMediaInsight[]
      }
    } catch (error) {
      console.log('Instagram analytics fetch skipped', error)
    }
  }

  const totalPostLikes = recentPosts.reduce(
    (sum, post) => sum + Number(post.like_count || 0),
    0
  )
  const totalPostComments = recentPosts.reduce(
    (sum, post) => sum + Number(post.comments_count || 0),
    0
  )
  const totalPostEngagement = totalPostLikes + totalPostComments
  const averageEngagementPerPost = recentPosts.length
    ? Math.round(totalPostEngagement / recentPosts.length)
    : 0

  const chartBuckets = Array.from({ length: 6 }, (_, index) => {
    const date = new Date()
    date.setMonth(date.getMonth() - (5 - index))

    return {
      key: `${date.getFullYear()}-${date.getMonth()}`,
      month: monthLabel(date),
      engagement: 0,
      posts: 0,
      replies: 0,
    }
  })

  recentPosts.forEach((post) => {
    const postDate = new Date(post.timestamp)
    const bucket = chartBuckets.find(
      (item) => item.key === `${postDate.getFullYear()}-${postDate.getMonth()}`
    )

    if (bucket) {
      bucket.posts += 1
      bucket.engagement +=
        Number(post.like_count || 0) + Number(post.comments_count || 0)
    }
  })

  activeAutomations.forEach((automation) => {
    const createdAt = new Date(automation.createdAt)
    const bucket = chartBuckets.find(
      (item) => item.key === `${createdAt.getFullYear()}-${createdAt.getMonth()}`
    )

    if (bucket && automation.listener) {
      bucket.replies +=
        automation.listener.dmCount + automation.listener.commentCount
    }
  })

  const topPosts = [...recentPosts]
    .sort(
      (a, b) =>
        Number(b.like_count || 0) +
        Number(b.comments_count || 0) -
        (Number(a.like_count || 0) + Number(a.comments_count || 0))
    )
    .slice(0, 6)

  return {
    connected: Boolean(integration),
    profile: profileMetrics,
    automations: {
      total: automations.length,
      active: activeAutomations.length,
      smartAi: smartAiAutomations,
      keywords: totalKeywords,
      replies: totalReplies,
      dmReplies: totalDmReplies,
      commentReplies: totalCommentReplies,
    },
    posts: {
      total: profileMetrics.mediaCount || recentPosts.length,
      totalLikes: totalPostLikes,
      totalComments: totalPostComments,
      totalEngagement: totalPostEngagement,
      averageEngagementPerPost,
      recent: recentPosts,
      top: topPosts,
    },
    chart: chartBuckets.map(({ key, ...item }) => item),
  }
}

import { getDashboardAnalytics } from '@/actions/dashboard'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { InstagramPostProps } from '@/types/posts.type'
import { Activity, Heart, MessageCircle, Sparkles, Zap } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Chart from './_components/metrics'
import MetricsCard from './_components/metrics/metrics_card'

type Props = {}

const getInitials = (value?: string | null) =>
  value
    ?.split(/[\s._-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('') || 'IG'

const Page = async (props: Props) => {
  const analytics = await getDashboardAnalytics()
  const overviewCards = [
    {
      label: 'Active Automations',
      value: analytics.automations.active,
      helper: `${analytics.automations.total} total workflows live in this account`,
      icon: <Zap className="h-4 w-4 text-[#ffb36a]" />,
    },
    {
      label: 'Replies Sent',
      value: analytics.automations.replies,
      helper: `${analytics.automations.dmReplies} DMs and ${analytics.automations.commentReplies} comments handled`,
      icon: <MessageCircle className="h-4 w-4 text-[#ff974f]" />,
    },
    {
      label: 'Post Engagement',
      value: analytics.posts.totalEngagement,
      helper: `${analytics.posts.averageEngagementPerPost} average interactions per recent post`,
      icon: <Heart className="h-4 w-4 text-[#ef7d32]" />,
    },
    {
      label: 'Smart AI Flows',
      value: analytics.automations.smartAi,
      helper: `${analytics.automations.keywords} trigger keywords tracking audience intent`,
      icon: <Sparkles className="h-4 w-4 text-[#ffd09a]" />,
    },
  ]

  return (
    <div className="flex flex-col gap-y-10">
      <div className="grid gap-5 lg:grid-cols-4">
        {overviewCards.map((card) => (
          <Card
            key={card.label}
            className="dashboard-panel overflow-hidden rounded-[1.75rem] border-white/10"
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm text-zinc-400">
                  {card.label}
                </CardTitle>
                {card.icon}
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-4xl font-semibold text-white">{card.value}</p>
              <p className="text-sm leading-6 text-zinc-400">
                {card.helper}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="dashboard-panel rounded-[1.75rem] border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div className="space-y-1">
              <CardTitle className="text-2xl text-white">
                Account Snapshot
              </CardTitle>
              <p className="text-sm text-zinc-400">
                Quick health check for the connected Instagram account
              </p>
            </div>
            <Badge className="bg-[#ef7d32]/15 text-[#ffb36a] hover:bg-[#ef7d32]/15">
              {analytics.connected ? 'Connected' : 'Not Connected'}
            </Badge>
          </CardHeader>
          <CardContent className="grid gap-6 lg:grid-cols-[auto_1fr]">
            <Avatar className="h-20 w-20 ring-2 ring-[#ef7d32]">
              <AvatarImage
                src={analytics.profile.avatarUrl || undefined}
                alt={analytics.profile.displayName || 'Instagram account'}
              />
              <AvatarFallback className="orange-gradient text-white text-xl">
                {getInitials(
                  analytics.profile.displayName || analytics.profile.username
                )}
              </AvatarFallback>
            </Avatar>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                  Username
                </p>
                <p className="mt-1 text-lg font-semibold text-white">
                  {analytics.profile.username
                    ? `@${analytics.profile.username}`
                    : 'Connect Instagram to load profile'}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                  Display Name
                </p>
                <p className="mt-1 text-lg font-semibold text-white">
                  {analytics.profile.displayName || 'Unavailable'}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                  Media Library
                </p>
                <p className="mt-1 text-2xl font-semibold text-white">
                  {analytics.posts.total}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                  Followers
                </p>
                <p className="mt-1 text-2xl font-semibold text-white">
                  {analytics.profile.followersCount ?? 'Unavailable'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-panel rounded-[1.75rem] border-white/10">
          <CardHeader>
            <CardTitle className="text-2xl text-white">
              Engagement Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="dashboard-panel-muted rounded-2xl p-4">
              <p className="text-sm text-zinc-400">Likes on recent posts</p>
              <p className="mt-2 text-3xl font-semibold text-white">
                {analytics.posts.totalLikes}
              </p>
            </div>
            <div className="dashboard-panel-muted rounded-2xl p-4">
              <p className="text-sm text-zinc-400">
                Comments on recent posts
              </p>
              <p className="mt-2 text-3xl font-semibold text-white">
                {analytics.posts.totalComments}
              </p>
            </div>
            <div className="dashboard-panel-muted rounded-2xl p-4">
              <p className="text-sm text-zinc-400">Average per post</p>
              <p className="mt-2 text-3xl font-semibold text-white">
                {analytics.posts.averageEngagementPerPost}
              </p>
            </div>
            <div className="dashboard-panel-muted rounded-2xl p-4">
              <p className="text-sm text-zinc-400">Trigger keywords</p>
              <p className="mt-2 text-3xl font-semibold text-white">
                {analytics.automations.keywords}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="dashboard-panel relative p-6 rounded-[1.75rem]">
        <span className="flex gap-x-1 z-50 items-center">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#ef7d32]/15 text-[#ffb36a]">
            <Activity className="h-5 w-5" />
          </div>
          <div className="z-50">
            <h2 className="text-2xl font-medium text-white">
              Audience Activity
            </h2>
            <p className="text-zinc-400 text-sm">
              Track how recent engagement and automated replies move together over time
            </p>
          </div>
        </span>
        <div className="w-full flex lg:flex-row flex-col gap-5">
          <div className="lg:w-6/12">
            <Chart chartData={analytics.chart} />
          </div>
          <div className="lg:w-6/12">
            <MetricsCard
              replies={analytics.automations.replies}
              dmReplies={analytics.automations.dmReplies}
              commentReplies={analytics.automations.commentReplies}
              totalEngagement={analytics.posts.totalEngagement}
              averageEngagementPerPost={analytics.posts.averageEngagementPerPost}
            />
          </div>
        </div>
      </div>

      <Card className="dashboard-panel rounded-[1.75rem] border-white/10">
        <CardHeader>
          <CardTitle className="text-2xl text-white">
            Top Performing Posts
          </CardTitle>
          <p className="text-sm text-zinc-400">
            Your latest Instagram content ranked by visible interactions
          </p>
        </CardHeader>
        <CardContent>
          {analytics.posts.top.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {analytics.posts.top.map((post: InstagramPostProps) => {
                const preview =
                  post.media_type === 'VIDEO'
                    ? post.thumbnail_url || post.media_url
                    : post.media_url

                return (
                  <Link
                    key={post.id}
                    href={post.permalink || '#'}
                    target={post.permalink ? '_blank' : undefined}
                    className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:border-[#ef7d32]/60"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={preview}
                        alt={post.caption || 'Instagram post'}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition duration-300 group-hover:scale-[1.03]"
                      />
                      <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 bg-gradient-to-t from-black/80 to-transparent p-4 text-sm text-white">
                        <span className="inline-flex items-center gap-1">
                          <Heart className="h-4 w-4" />
                          {post.like_count || 0}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <MessageCircle className="h-4 w-4" />
                          {post.comments_count || 0}
                        </span>
                        <Badge className="ml-auto bg-[#ef7d32]/15 text-[#ffb36a] hover:bg-[#ef7d32]/15">
                          {post.media_type}
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-2 p-4">
                      <p className="line-clamp-2 text-sm text-white">
                        {post.caption || 'No caption available for this post.'}
                      </p>
                      <p className="text-xs text-zinc-500">
                        {new Date(post.timestamp).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-white/10 p-10 text-center text-zinc-400">
              Connect an Instagram account to surface post-level analytics and engagement insights here.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default Page

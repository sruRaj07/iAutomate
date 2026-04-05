export type InstagramPostProps = {
  id: string
  media_type: 'IMAGE' | 'VIDEO' | 'CAROSEL_ALBUM'
  media_url: string
  thumbnail_url?: string
  permalink?: string
  timestamp: Date | string
  caption?: string
  comments_count?: number
  like_count?: number
}

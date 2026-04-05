'use server'

import { redirect } from 'next/navigation'
import { onCurrentUser } from '../user'
import { createIntegration, deleteIntegration, getIntegration } from './queries'
import { generateTokens } from '@/lib/fetch'
import axios from 'axios'

export const onOAuthInstagram = async (strategy: 'INSTAGRAM' | 'CRM') => {
  if (strategy === 'INSTAGRAM') {
    const host = process.env.NEXT_PUBLIC_HOST_URL as string
    const clientId = process.env.INSTAGRAM_CLIENT_ID as string
    const authUrl = new URL(
      process.env.INSTAGRAM_EMBEDDED_OAUTH_URL ||
        'https://www.instagram.com/oauth/authorize'
    )

    authUrl.searchParams.set('client_id', clientId)
    authUrl.searchParams.set('redirect_uri', `${host}/callback/instagram`)
    authUrl.searchParams.set('response_type', 'code')
    authUrl.searchParams.set(
      'scope',
      authUrl.searchParams.get('scope') ||
        'instagram_business_basic,instagram_business_manage_messages,instagram_business_manage_comments,instagram_business_content_publish,instagram_business_manage_insights'
    )
    authUrl.searchParams.set(
      'enable_fb_login',
      authUrl.searchParams.get('enable_fb_login') || '0'
    )
    authUrl.searchParams.set(
      'force_authentication',
      authUrl.searchParams.get('force_authentication') || '1'
    )

    return redirect(authUrl.toString())
  }
}

export const onIntegrate = async (code: string) => {
  const user = await onCurrentUser()

  try {
    const integration = await getIntegration(user.id)

    if (integration && integration.integrations.length === 0) {
      const token = await generateTokens(code)
      console.log(token)

      if (token) {
        const instagramProfile = await axios.get(
          `${process.env.INSTAGRAM_BASE_URL}/me?fields=user_id,username&access_token=${token.access_token}`
        )

        const today = new Date()
        const expire_date = today.setDate(today.getDate() + 60)
        const create = await createIntegration(
          user.id,
          token.access_token,
          new Date(expire_date),
          {
            id: instagramProfile.data.user_id,
            username: instagramProfile.data.username,
            displayName: instagramProfile.data.username,
          }
        )
        return { status: 200, data: create }
      }
      console.log('🔴 401')
      return { status: 401 }
    }
    console.log('🔴 404')
    return { status: 404 }
  } catch (error) {
    console.log('🔴 500', error)
    return { status: 500 }
  }
}

export const onDisconnectIntegration = async (
  strategy: 'INSTAGRAM'
) => {
  const user = await onCurrentUser()

  try {
    const deleted = await deleteIntegration(user.id, strategy)

    if (deleted.count > 0) {
      return { status: 200, data: `${strategy} disconnected successfully` }
    }

    return { status: 404, data: 'Integration not found' }
  } catch (error) {
    console.log('🔴 disconnect error', error)
    return { status: 500, data: 'Failed to disconnect integration' }
  }
}

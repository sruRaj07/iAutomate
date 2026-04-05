'use server'

import { client } from '@/lib/prisma'

export const updateIntegration = async (
  token: string,
  expire: Date,
  id: string
) => {
  return await client.integrations.update({
    where: { id },
    data: {
      token,
      expiresAt: expire,
    },
  })
}

export const getIntegration = async (clerkId: string) => {
  return await client.user.findUnique({
    where: {
      clerkId,
    },
    select: {
      integrations: {
        where: {
          name: 'INSTAGRAM',
        },
      },
    },
  })
}

export const createIntegration = async (
  clerkId: string,
  token: string,
  expire: Date,
  integration?: {
    id?: string
    username?: string
    displayName?: string
    avatarUrl?: string
  }
) => {
  return await client.user.update({
    where: {
      clerkId,
    },
    data: {
      integrations: {
        create: {
          token,
          expiresAt: expire,
          instagramId: integration?.id,
          instagramUsername: integration?.username,
          instagramDisplayName: integration?.displayName,
          instagramAvatarUrl: integration?.avatarUrl,
        },
      },
    },
    select: {
      firstname: true,
      lastname: true,
    },
  })
}

export const deleteIntegration = async (clerkId: string, name: 'INSTAGRAM') => {
  return await client.integrations.deleteMany({
    where: {
      name,
      User: {
        clerkId,
      },
    },
  })
}

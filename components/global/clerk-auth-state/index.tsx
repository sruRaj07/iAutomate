import React from 'react'
import { ClerkLoading, Show, SignInButton, UserButton } from '@clerk/nextjs'
import { User } from 'lucide-react'
import Loader from '../loader'
import { Button } from '@/components/ui/button'

type Props = {}

const ClerkAuthState = (props: Props) => {
  return (
    <>
      <ClerkLoading>
        <Loader state>
          <></>
        </Loader>
      </ClerkLoading>
      <Show when="signed-out">
        <SignInButton>
          <Button
            className="rounded-xl 
          bg-[#252525] 
          text-white 
          hover:bg-[#252525]/70
          "
          >
            <User />
            Login
          </Button>
        </SignInButton>
      </Show>
      <Show when="signed-in">
        <UserButton>
          <UserButton.UserProfileLink
            label="Dashboard"
            url={`/dashboard`}
            labelIcon={<User size={16} />}
          />
        </UserButton>
      </Show>
    </>
  )
}

export default ClerkAuthState

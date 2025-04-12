import { onIntegrate } from '@/actions/integrations'
import { redirect } from 'next/navigation'

type Props = {
  searchParams: {
    code: string
  }
}

const Page = async ({ searchParams: { code } }: Props) => {
  if (code) {
    const response = await fetch(
      `/api/webhook/instagram?code=${code.split('#_')[0]}`,
      { method: 'GET' }
    )
    const result = await response.json()

    if (response.ok) {
      return redirect(
        `/dashboard/${result.data.firstname}${result.data.lastname}/integrations`
      )
    }
  }
  return redirect('/sign-up')
}

export default Page

import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { isUserAuthorized } from '@tinacms/auth'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const slug = searchParams.get('slug')
  const token = searchParams.get('token')

  if (secret !== process.env.DRAFT_SECRET) {
    return new Response('Invalid token', { status: 401 })
  }

  if (process.env.NODE_ENV !== 'development') {
    const isAuthorized = await isUserAuthorized({
      token: `Bearer ${token}`,
      clientID: process.env.NEXT_PUBLIC_TINA_CLIENT_ID!,
    })

    if (!isAuthorized) {
      return new Response('Invalid token', { status: 401 })
    }
  }

  draftMode().enable()

  redirect(slug ?? '/')
}
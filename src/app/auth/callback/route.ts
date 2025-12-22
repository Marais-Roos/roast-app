import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      // Get the proper origin for redirect
      const forwardedHost = request.headers.get('x-forwarded-host')
      const forwardedProto = request.headers.get('x-forwarded-proto')
      
      let redirectUrl
      if (forwardedHost) {
        // Production (Vercel)
        redirectUrl = `${forwardedProto || 'https'}://${forwardedHost}${next}`
      } else {
        // Local development
        const origin = request.headers.get('origin') || 'http://localhost:3000'
        redirectUrl = `${origin}${next}`
      }
      
      return NextResponse.redirect(redirectUrl)
    }
  }

  // If there's an error or no code, redirect to login with error
  const forwardedHost = request.headers.get('x-forwarded-host')
  const forwardedProto = request.headers.get('x-forwarded-proto')
  
  let errorRedirect
  if (forwardedHost) {
    errorRedirect = `${forwardedProto || 'https'}://${forwardedHost}/login?error=Unable to confirm your email. Please try again.`
  } else {
    const origin = request.headers.get('origin') || 'http://localhost:3000'
    errorRedirect = `${origin}/login?error=Unable to confirm your email. Please try again.`
  }
  
  return NextResponse.redirect(errorRedirect)
}

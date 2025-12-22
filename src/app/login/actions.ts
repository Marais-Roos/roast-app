'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '../../utils/supabase/server' 

export async function login(formData: FormData) {
  const supabase = await createClient() 

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    // Check if it's an email not confirmed error
    if (error.message.includes('Email not confirmed')) {
      redirect('/login?error=Please confirm your email address before logging in. Check your inbox for the confirmation link.')
    }
    redirect('/login?error=Invalid email or password. If you just signed up, please confirm your email first.')
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}
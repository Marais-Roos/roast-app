'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '../../utils/supabase/server'

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string

  // Validate passwords match
  if (password !== confirmPassword) {
    redirect('/signup?error=Passwords do not match')
  }

  // Validate password length
  if (password.length < 6) {
    redirect('/signup?error=Password must be at least 6 characters')
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
      },
    },
  })

  if (error) {
    redirect('/signup?error=Could not create account. Please try again.')
  }

  // Check if email confirmation is required
  if (data?.user && !data.session) {
    redirect('/signup?success=Account created! Please check your email to confirm your account before logging in.')
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

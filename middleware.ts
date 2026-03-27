import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // IMPORTANT: DO NOT REMOVE auth.getUser()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const demoRole = request.cookies.get('demo-role')?.value

  if (request.nextUrl.pathname.startsWith('/user')) {
     if (!user && demoRole !== 'user' && demoRole !== 'admin') {
        return NextResponse.redirect(new URL('/auth/login', request.url))
     }
  }

  // Admin Check
  if (request.nextUrl.pathname.startsWith('/admin')) {
     if (!user && demoRole !== 'admin') {
        return NextResponse.redirect(new URL('/auth/login', request.url))
     }
     
     if (user) {
        const { data: profile } = await supabase
           .from('profiles')
           .select('role')
           .eq('id', user.id)
           .single()

        if (profile?.role !== 'admin' && demoRole !== 'admin') {
           return NextResponse.redirect(new URL('/user/dashboard', request.url))
        }
     }
  }

  // Redirect if logged in
  if (request.nextUrl.pathname.startsWith('/auth') && (user || demoRole)) {
     return NextResponse.redirect(new URL(demoRole === 'admin' ? '/admin/dashboard' : '/user/dashboard', request.url))
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

import { AuthBrandPanel } from '@/components/auth/AuthBrandPanel'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh grid lg:grid-cols-2 bg-bg">
      <AuthBrandPanel />
      <div className="flex flex-col items-center justify-center p-8 min-h-dvh">
        {children}
      </div>
    </div>
  )
}

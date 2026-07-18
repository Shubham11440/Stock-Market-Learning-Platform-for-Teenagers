import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { getProfile } from '@/lib/profile/profile'
import { SettingsForm } from '@/components/profile/SettingsForm'
import { Settings } from 'lucide-react'

export const metadata = {
  title: 'Settings | StockUp',
}

export default async function SettingsPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/login')

  const user = await getProfile(session.user.id)
  if (!user) redirect('/dashboard')

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold text-text-1 flex items-center gap-3">
          <Settings className="text-primary" size={32} />
          Settings
        </h1>
        <p className="text-text-3 mt-1 text-sm">Manage your account preferences and verify your identity.</p>
      </div>

      <SettingsForm user={user} />
    </div>
  )
}

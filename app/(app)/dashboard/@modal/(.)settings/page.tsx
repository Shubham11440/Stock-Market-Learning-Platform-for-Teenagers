import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { getProfile } from '@/lib/profile/profile'
import { SettingsForm } from '@/components/profile/SettingsForm'
import { Settings } from 'lucide-react'
import { InterceptedModal } from '@/components/ui/intercepted-modal'

export default async function InterceptedSettingsPage() {
  const session = await auth()
  if (!session?.user?.id) return null

  const user = await getProfile(session.user.id)
  if (!user) return null

  return (
    <InterceptedModal>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-display font-bold text-text-1 flex items-center gap-3">
            <Settings className="text-primary" size={28} />
            Settings
          </h2>
          <p className="text-text-3 mt-1 text-sm">Manage your account preferences and verify your identity.</p>
        </div>

        <SettingsForm user={user} />
      </div>
    </InterceptedModal>
  )
}

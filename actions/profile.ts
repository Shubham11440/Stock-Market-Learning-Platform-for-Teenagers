'use server'

import { auth } from '@/lib/auth'
import { updateUserSettings, UpdateSettingsPayload } from '@/lib/profile/settings'
import { settingsSchema } from '@/lib/profile/validation'
import { revalidatePath } from 'next/cache'

export async function updateProfileSettingsAction(data: UpdateSettingsPayload) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return { success: false, error: 'Unauthorized' }
    }

    // Validate using Zod
    const validatedData = settingsSchema.parse(data)

    await updateUserSettings(session.user.id, validatedData)
    
    // Revalidate paths that use this data
    revalidatePath('/dashboard/settings')
    revalidatePath('/dashboard/profile')
    revalidatePath('/dashboard') // To update avatar/name everywhere
    
    return { success: true, message: 'Settings updated successfully!' }
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return { success: false, error: error.errors[0].message }
    }
    return { success: false, error: 'Failed to update settings' }
  }
}

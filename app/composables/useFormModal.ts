import type { z } from 'zod'
import FormModal from '~/components/FormModal.vue'

export const useFormModal = <T extends z.ZodSchema>() => {
  const overlay = useOverlay()

  return overlay.create<typeof FormModal<T>>(FormModal)
}

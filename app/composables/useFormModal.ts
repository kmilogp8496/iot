import type { ComponentInstance } from 'vue'
import FormModal from '~/components/FormModal.vue'

export const useFormModal = (props?: (ComponentInstance<typeof FormModal>)['$props']) => {
  const overlay = useOverlay()

  const args: Parameters<typeof overlay.create> = [FormModal]

  if (props) {
    args.push(props)
  }

  const modal = overlay.create(...args)

  return modal
}

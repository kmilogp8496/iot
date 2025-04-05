import ConfirmModal from '~/components/ConfirmModal.vue'

export const useConfirmModal = () => {
  const overlay = useOverlay()

  const modal = overlay.create(ConfirmModal)

  return modal
}

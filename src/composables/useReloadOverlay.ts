interface ReloadOverlayOptions {
  label?: string
  message?: string
}

export function useReloadOverlay() {
  const active = useState('conteful-reload-active', () => false)
  const label = useState('conteful-reload-label', () => '')
  const message = useState('conteful-reload-message', () => '')

  function show(options: ReloadOverlayOptions = {}) {
    active.value = true
    label.value = options.label || ''
    message.value = options.message || ''
  }

  function hide() {
    active.value = false
    label.value = ''
    message.value = ''
  }

  async function run<T>(task: () => Promise<T>, options: ReloadOverlayOptions = {}) {
    show(options)

    try {
      return await task()
    } finally {
      hide()
    }
  }

  return {
    active,
    label,
    message,
    show,
    hide,
    run,
  }
}

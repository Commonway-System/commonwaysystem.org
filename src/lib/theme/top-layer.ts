/**
 * Keeps an always-on overlay (the Pointer highlight) above everything,
 * including the browser's top layer: modal <dialog>s (the search dialog) and
 * popovers (the Display settings panel) paint above every z-index, so an
 * ordinary fixed element ends up underneath them. The element becomes a
 * manual popover, and whenever another dialog or popover opens it is hidden
 * and shown again, which moves it back to the top of the top layer (the
 * last one shown is drawn last). Returns a cleanup function. Does nothing
 * where popovers aren't supported; the element keeps its z-index there.
 */
export function keepOnTopLayer(el: HTMLElement): () => void {
  if (typeof el.showPopover !== 'function')
    return () => {}
  el.setAttribute('popover', 'manual')
  const raise = () => {
    if (!el.isConnected)
      return
    if (el.matches(':popover-open'))
      el.hidePopover()
    el.showPopover()
  }
  raise()

  // Popovers fire `toggle` (it doesn't bubble, so listen in the capture phase).
  const onToggle = (e: Event) => {
    const t = e.target as HTMLElement
    if (t !== el && t.hasAttribute?.('popover') && (e as ToggleEvent).newState === 'open')
      raise()
  }
  document.addEventListener('toggle', onToggle, true)

  // A <dialog> opened with showModal() gains the `open` attribute.
  const mo = new MutationObserver((records) => {
    if (records.some(r => r.target instanceof HTMLDialogElement && r.target.open))
      raise()
  })
  mo.observe(document.body, { subtree: true, attributes: true, attributeFilter: ['open'] })

  return () => {
    document.removeEventListener('toggle', onToggle, true)
    mo.disconnect()
    if (el.matches(':popover-open'))
      el.hidePopover()
  }
}

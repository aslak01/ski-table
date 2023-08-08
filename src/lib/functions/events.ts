import type { ActionReturn } from 'svelte/types/runtime/action'

export function onhover(
  node: HTMLElement,
  callback: EventListener,
): ActionReturn {
  node.addEventListener('mouseenter', callback)
  node.addEventListener('mouseleave', callback)

  return {
    destroy() {
      node.removeEventListener('mouseenter', callback)
      node.removeEventListener('mouseleave', callback)
    },
  }
}

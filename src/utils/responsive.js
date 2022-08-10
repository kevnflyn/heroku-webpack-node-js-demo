
export const EXTRA_SMALL_DEVICE_WIDTH = 320

export const SMALL_DEVICE_WIDTH = 768

export const MEDIUM_DEVICE_WIDTH = 992

export const LARGE_DEVICE_WIDTH = 1200

export const isMobile = () => (
  window.innerWidth >= EXTRA_SMALL_DEVICE_WIDTH &&
  window.innerWidth < SMALL_DEVICE_WIDTH
)

export const isTablet = () => (
  window.innerWidth >= SMALL_DEVICE_WIDTH &&
  window.innerWidth < MEDIUM_DEVICE_WIDTH
)

export const isLaptop = () => (
  window.innerWidth >= EXTRA_SMALL_DEVICE_WIDTH &&
  window.innerWidth < LARGE_DEVICE_WIDTH
)

export const isDesktop = () => (
  window.innerWidth >= LARGE_DEVICE_WIDTH
)

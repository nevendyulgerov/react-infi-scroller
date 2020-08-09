export interface ScrollSpyInitConfig {
  element: any,
  immediate?: boolean | false,
  onScroll: (scrollYOffset: number) => void
}

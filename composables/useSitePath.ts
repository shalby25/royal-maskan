export function useSitePath(path: string) {
  const base = useRuntimeConfig().app.baseURL || '/'
  return `${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`
}

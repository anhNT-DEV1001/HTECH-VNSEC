const API_PREFIX_PATTERN = /\/api\/v\d+\/?$/

export const resolveApiAssetUrl = (path?: string | null) => {
  if (!path) return undefined
  if (/^https?:\/\//i.test(path)) return path

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || ""
  const host = apiUrl.replace(API_PREFIX_PATTERN, "")
  const normalizedPath = path.startsWith("/") ? path : `/${path}`

  return host ? `${host}${normalizedPath}` : normalizedPath
}

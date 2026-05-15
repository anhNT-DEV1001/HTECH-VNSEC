"use client"

import { useEffect, useState } from "react"
import { Shield } from "lucide-react"
import dynamicIconImports from "lucide-react/dynamicIconImports"
import type { LucideIcon, LucideProps } from "lucide-react"

const FALLBACK_ICON = Shield
type DynamicIconName = keyof typeof dynamicIconImports

const toPascalCase = (value: string) =>
  value
    .trim()
    .replace(/icon$/i, "")
    .split(/[\s_-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join("")

const toKebabCase = (value: string) =>
  value
    .trim()
    .replace(/icon$/i, "")
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .replace(/--+/g, "-")
    .toLowerCase()

const resolveCandidateIconNames = (name?: string | null) => {
  const normalizedName = name?.trim()
  if (!normalizedName) return []

  return Array.from(
    new Set([
      normalizedName,
      toPascalCase(normalizedName),
      toKebabCase(normalizedName),
      toKebabCase(toPascalCase(normalizedName)),
    ])
  )
}

export const resolveLucideIconName = (name?: string | null): DynamicIconName | null => {
  const candidateNames = resolveCandidateIconNames(name)

  return (
    candidateNames.find(
      (candidateName) => candidateName in dynamicIconImports
    ) as DynamicIconName | undefined
  ) ?? null
}

type LucideIconByNameProps = Omit<LucideProps, "ref" | "name"> & {
  name?: string | null
}

export function LucideIconByName({ name, ...props }: LucideIconByNameProps) {
  const [Icon, setIcon] = useState<LucideIcon>(FALLBACK_ICON)

  useEffect(() => {
    let isMounted = true

    const iconName = resolveLucideIconName(name)
    if (!iconName) {
      setIcon(() => FALLBACK_ICON)
      return () => {
        isMounted = false
      }
    }

    dynamicIconImports[iconName]()
      .then((module: { default: LucideIcon }) => {
        if (!isMounted) return
        setIcon(() => module.default)
      })
      .catch(() => {
        if (!isMounted) return
        setIcon(() => FALLBACK_ICON)
      })

    return () => {
      isMounted = false
    }
  }, [name])

  return <Icon {...props} />
}

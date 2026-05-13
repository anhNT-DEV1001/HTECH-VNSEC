// lib/sponsor-helpers.ts

import type { Exhibitor, SponsorTier } from "@/types/sponsor"

// Chuẩn hóa tên hạng thành key
function normalizeTierKey(name_vn: string): string {
  return name_vn.toLowerCase().trim()
}

export function groupSponsorsByTier(exhibitors: Exhibitor[]): SponsorTier[] {
  const grouped = new Map<string, Exhibitor[]>()
  const displayOrders = new Map<string, number>()

  for (const exhibitor of exhibitors) {
    const tierKey = normalizeTierKey(exhibitor.rank.name_vn)
    const displayOrder = exhibitor.rank.display_order

    if (!grouped.has(tierKey)) {
      grouped.set(tierKey, [])
      displayOrders.set(tierKey, displayOrder)
    }
    grouped.get(tierKey)!.push(exhibitor)
  }

  // Sắp xếp theo display_order của rank (số nhỏ lên trước = hạng cao hơn)
  return Array.from(grouped.entries())
    .sort(([aKey], [bKey]) => (displayOrders.get(aKey) ?? 999) - (displayOrders.get(bKey) ?? 999))
    .map(([key, sponsors]) => ({
      key,
      label: sponsors[0].rank.name_vn,
      display_order: displayOrders.get(key) ?? 999,
      sponsors,
    }))
}
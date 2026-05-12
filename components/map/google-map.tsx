"use client"

import { MapPin } from "lucide-react"

interface GoogleMapComponentProps {
  center?: { lat: number; lng: number }
  zoom?: number
  height?: string
}

function GoogleMapComponent({
  center = { lat: 10.73121, lng: 106.721481 },
  zoom = 15,
  height = "400px",
}: GoogleMapComponentProps) {
  const mapUrl = `https://www.google.com/maps?q=${center.lat},${center.lng}&z=${zoom}&output=embed&t=&z=${zoom > 17 ? 17 : zoom}`

  return (
    <div className="relative overflow-hidden rounded-lg border border-border">
      <iframe
        title="Google Maps"
        width="100%"
        height={height}
        loading="lazy"
        src={mapUrl}
        className="border-0"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
      />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="flex flex-col items-center gap-2 text-primary/40">
          <MapPin className="h-10 w-10 animate-pulse" />
        </div>
      </div>
    </div>
  )
}

export default GoogleMapComponent

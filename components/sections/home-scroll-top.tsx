"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HomeScrollTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 320)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 right-4 z-50 sm:bottom-8 sm:right-8"
        >
          <Button
            type="button"
            size="icon-lg"
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="h-12 w-12 rounded-full bg-primary/95 text-primary-foreground shadow-[0_18px_40px_rgba(234,88,12,0.35)] backdrop-blur hover:-translate-y-1 hover:bg-primary"
          >
            <ChevronUp className="h-5 w-5" />
          </Button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

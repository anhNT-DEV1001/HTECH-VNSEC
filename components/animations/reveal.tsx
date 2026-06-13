"use client"

import type { ReactNode } from "react"
import { motion, type Variants } from "framer-motion"
import { cn } from "@/lib/utils"

type RevealDirection = "up" | "down" | "left" | "right" | "scale"

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  once?: boolean
  amount?: number
  direction?: RevealDirection
  inherit?: boolean
}

type StaggerRevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  stagger?: number
  once?: boolean
  amount?: number
}

const revealVariants: Record<RevealDirection, Variants> = {
  up: {
    hidden: { opacity: 0, y: 32, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  },
  down: {
    hidden: { opacity: 0, y: -32, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  },
  left: {
    hidden: { opacity: 0, x: 32, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  },
  right: {
    hidden: { opacity: 0, x: -32, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.94, y: 20, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  },
}

export function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.7,
  once = true,
  amount = 0.2,
  direction = "up",
  inherit = false,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      variants={revealVariants[direction]}
      initial={inherit ? undefined : "hidden"}
      whileInView={inherit ? undefined : "visible"}
      viewport={inherit ? undefined : { once, amount }}
      transition={{ delay, duration, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerReveal({
  children,
  className,
  delay = 0,
  stagger = 0.12,
  once = true,
  amount = 0.15,
}: StaggerRevealProps) {
  const variants: Variants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: delay,
        staggerChildren: stagger,
      },
    },
  }

  return (
    <motion.div
      className={cn(className)}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
    >
      {children}
    </motion.div>
  )
}

"use client"

import type { Section, Theme } from "@/lib/types"
import { HeroSection } from "@/components/sections/hero"
import { NavSection } from "@/components/sections/nav"
import { FeaturesSection } from "@/components/sections/features"
import { PricingSection } from "@/components/sections/pricing"
import { CtaSection } from "@/components/sections/cta"
import { TestimonialsSection } from "@/components/sections/testimonials"
import { FooterSection } from "@/components/sections/footer"

interface SectionRendererProps {
  section: Section
  theme: Theme
  isSelected: boolean
  isCyclingVariant?: boolean
}

export function SectionRenderer({ section, theme, isSelected, isCyclingVariant = false }: SectionRendererProps) {
  const renderSection = () => {
    switch (section.type) {
      case "hero":
        return <HeroSection variant={section.variant} theme={theme} />
      case "nav":
        return <NavSection variant={section.variant} theme={theme} />
      case "features":
        return <FeaturesSection variant={section.variant} theme={theme} />
      case "pricing":
        return <PricingSection variant={section.variant} theme={theme} />
      case "cta":
        return <CtaSection variant={section.variant} theme={theme} />
      case "testimonials":
        return <TestimonialsSection variant={section.variant} theme={theme} />
      case "footer":
        return <FooterSection variant={section.variant} theme={theme} />
      default:
        return <div>Unknown section type</div>
    }
  }

  // Apply a class to prevent any CSS transitions during variant cycling
  const noTransitionClass = isCyclingVariant ? "transition-none" : ""

  return (
    <div
      className={`w-full ${isSelected ? "ring-2 ring-primary ring-offset-2" : ""} ${noTransitionClass}`}
      style={{
        contain: "content",
        // Apply the theme's border radius to the section container
        borderRadius: `${theme.borderRadius}px`,
      }}
    >
      {renderSection()}
    </div>
  )
}

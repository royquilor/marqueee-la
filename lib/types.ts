export interface Section {
  id: string
  type: string
  variant: number
}

export interface Theme {
  headingFont: string
  bodyFont: string
  colors: {
    primary: string
    secondary: string
    background: string
    foreground: string
    muted: string
    mutedForeground: string
  }
  borderRadius: number
  containerWidth: string
}

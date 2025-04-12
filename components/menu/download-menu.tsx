"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"
import type { Section, Theme } from "@/lib/types"
import JSZip from "jszip"
import FileSaver from "file-saver" // Fixed import

interface DownloadMenuProps {
  sections: Section[]
  theme: Theme
}

export function DownloadMenu({ sections, theme }: DownloadMenuProps) {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const { toast } = useToast()

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Subscribed!",
      description: "Thank you for subscribing. You'll receive updates about our product.",
    })

    setIsSubmitting(false)
  }

  const generateHtmlFile = (sections: Section[], theme: Theme) => {
    // Create a basic HTML structure with the sections
    const sectionTypes = sections
      .map(
        (section) => `
      <!-- ${section.type.toUpperCase()} Section (Variant ${section.variant}) -->
      <section class="section ${section.type}-section">
        <div class="container">
          <h2>${section.type.charAt(0).toUpperCase() + section.type.slice(1)} Section</h2>
          <p>This is a placeholder for the ${section.type} section (variant ${section.variant}).</p>
        </div>
      </section>
    `,
      )
      .join("\n")

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Generated Website</title>
  <style>
    :root {
      --primary: ${theme.colors.primary};
      --secondary: ${theme.colors.secondary};
      --background: ${theme.colors.background};
      --foreground: ${theme.colors.foreground};
      --muted: ${theme.colors.muted};
      --muted-foreground: ${theme.colors.mutedForeground};
      --border-radius: ${theme.borderRadius}px;
    }
    
    body {
      font-family: ${theme.fontFamily};
      background-color: var(--background);
      color: var(--foreground);
      margin: 0;
      padding: 0;
    }
    
    .container {
      max-width: ${theme.containerWidth};
      margin: 0 auto;
      padding: 0 1rem;
    }
    
    .section {
      padding: 4rem 0;
      border-bottom: 1px solid var(--muted);
    }
    
    button {
      background-color: var(--primary);
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: var(--border-radius);
      cursor: pointer;
    }
    
    button:hover {
      opacity: 0.9;
    }
  </style>
</head>
<body>
  ${sectionTypes}
</body>
</html>`
  }

  const generateCssFile = (theme: Theme) => {
    return `/* Generated CSS for the website */
:root {
  --primary: ${theme.colors.primary};
  --secondary: ${theme.colors.secondary};
  --background: ${theme.colors.background};
  --foreground: ${theme.colors.foreground};
  --muted: ${theme.colors.muted};
  --muted-foreground: ${theme.colors.mutedForeground};
  --border-radius: ${theme.borderRadius}px;
}

body {
  font-family: ${theme.fontFamily};
  background-color: var(--background);
  color: var(--foreground);
  margin: 0;
  padding: 0;
}

.container {
  max-width: ${theme.containerWidth};
  margin: 0 auto;
  padding: 0 1rem;
}

.section {
  padding: 4rem 0;
  border-bottom: 1px solid var(--muted);
}

button {
  background-color: var(--primary);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius);
  cursor: pointer;
}

button:hover {
  opacity: 0.9;
}
`
  }

  const generateReadmeFile = (sections: Section[], theme: Theme) => {
    const sectionsList = sections
      .map(
        (section) => `- ${section.type.charAt(0).toUpperCase() + section.type.slice(1)} (Variant ${section.variant})`,
      )
      .join("\n")

    return `# Generated Website

This website was generated using the Website Builder tool.

## Sections
${sectionsList}

## Theme
- Primary Color: ${theme.colors.primary}
- Font Family: ${theme.fontFamily}
- Border Radius: ${theme.borderRadius}px
- Container Width: ${theme.containerWidth}

## Getting Started
1. Open the index.html file in your browser to view the website.
2. Edit the HTML and CSS files to customize the website further.
3. Add your own content and images.

## License
This website is licensed under the MIT License.
`
  }

  const handleDownload = async () => {
    setIsDownloading(true)

    try {
      // Create a new JSZip instance
      const zip = new JSZip()

      // Add files to the zip
      zip.file("index.html", generateHtmlFile(sections, theme))
      zip.file("styles.css", generateCssFile(theme))
      zip.file("README.md", generateReadmeFile(sections, theme))

      // Create a folder for assets
      const assets = zip.folder("assets")
      assets?.file("placeholder.txt", "Add your assets here (images, fonts, etc.)")

      // Generate the zip file
      const content = await zip.generateAsync({ type: "blob" })

      // Simulate a delay for the download process
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Save the zip file using FileSaver.saveAs() instead of saveAs()
      FileSaver.saveAs(content, "website-builder-export.zip")

      toast({
        title: "Download complete",
        description: "Your website code has been downloaded successfully",
      })
    } catch (error) {
      toast({
        title: "Download failed",
        description: "There was an error generating your download. Please try again.",
        variant: "destructive",
      })
      console.error("Download error:", error)
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <div className="flex items-center gap-1 flex-wrap">
      <form onSubmit={handleSubscribe} className="flex items-center gap-1">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-auto min-w-[150px] h-7 text-xs px-2 py-0"
        />
        <Button type="submit" variant="outline" size="sm" disabled={isSubmitting} className="h-7 text-xs px-2">
          {isSubmitting ? "..." : "Sub"}
        </Button>
      </form>

      <div className="h-5 w-px bg-border mx-1" />

      <Button
        onClick={handleDownload}
        size="sm"
        variant="primary"
        className="h-7 text-xs px-2"
        disabled={isDownloading || sections.length === 0}
      >
        {isDownloading ? (
          <>
            <Loader2 className="h-3 w-3 mr-1 animate-spin" />
            <span>Downloading...</span>
          </>
        ) : (
          "Download"
        )}
      </Button>
    </div>
  )
}

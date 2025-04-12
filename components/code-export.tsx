"use client"

import { useState } from "react"
import { useComponentStore } from "@/hooks/use-component-store"
import { useThemeStore } from "@/hooks/use-theme-store"
import { componentNames } from "./canvas"

export function CodeExport() {
  const { components, content } = useComponentStore()
  const theme = useThemeStore()
  const [isGenerating, setIsGenerating] = useState(false)

  // Function to generate and download the code as a ZIP file
  const handleExportCode = async () => {
    try {
      setIsGenerating(true)

      // Create a list of files to include in the ZIP
      const files = [
        {
          name: "README.md",
          content: generateReadme(),
        },
        {
          name: "package.json",
          content: generatePackageJson(),
        },
        {
          name: "next.config.js",
          content: generateNextConfig(),
        },
        {
          name: "tailwind.config.js",
          content: generateTailwindConfig(),
        },
        {
          name: "app/page.tsx",
          content: generateMainPage(),
        },
        {
          name: "app/layout.tsx",
          content: generateLayout(),
        },
        {
          name: "app/globals.css",
          content: generateGlobalCSS(),
        },
      ]

      // Add component files
      components.forEach((componentId) => {
        files.push({
          name: `components/${componentId}.tsx`,
          content: generateComponentCode(componentId),
        })
      })

      // Create a blob with the ZIP file
      const JSZip = (await import("jszip")).default
      const zip = new JSZip()

      // Add all files to the ZIP
      files.forEach((file) => {
        const folderPath = file.name.includes("/") ? file.name.substring(0, file.name.lastIndexOf("/")) : ""
        if (folderPath) {
          zip.folder(folderPath)
        }
        zip.file(file.name, file.content)
      })

      // Generate the ZIP file
      const zipBlob = await zip.generateAsync({ type: "blob" })

      // Create a download link and trigger the download
      const downloadLink = document.createElement("a")
      downloadLink.href = URL.createObjectURL(zipBlob)
      downloadLink.download = "landing-page.zip"
      document.body.appendChild(downloadLink)
      downloadLink.click()
      document.body.removeChild(downloadLink)
    } catch (error) {
      console.error("Error generating ZIP file:", error)
      alert("There was an error generating the ZIP file. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  // Generate README.md content
  const generateReadme = () => {
    const componentsList = components.map((id) => `- ${componentNames[id as keyof typeof componentNames]}`).join("\n")

    return `# Landing Page

This landing page was created with the Dynamic Island Landing Page Builder.

## Components Used

${componentsList}

## Getting Started

1. Install dependencies:
\`\`\`
npm install
\`\`\`

2. Run the development server:
\`\`\`
npm run dev
\`\`\`

3. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Customization

You can customize the theme by editing the CSS variables in \`app/globals.css\`.
`
  }

  // Generate package.json content
  const generatePackageJson = () => {
    return JSON.stringify(
      {
        name: "landing-page",
        version: "0.1.0",
        private: true,
        scripts: {
          dev: "next dev",
          build: "next build",
          start: "next start",
          lint: "next lint",
        },
        dependencies: {
          next: "^14.0.0",
          react: "^18.2.0",
          "react-dom": "^18.2.0",
        },
        devDependencies: {
          "@types/node": "^20.0.0",
          "@types/react": "^18.2.0",
          "@types/react-dom": "^18.2.0",
          autoprefixer: "^10.4.0",
          postcss: "^8.4.0",
          tailwindcss: "^3.3.0",
          typescript: "^5.0.0",
        },
      },
      null,
      2,
    )
  }

  // Generate next.config.js content
  const generateNextConfig = () => {
    return `/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig
`
  }

  // Generate tailwind.config.js content
  const generateTailwindConfig = () => {
    return `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
`
  }

  // Generate main page content
  const generateMainPage = () => {
    const componentImports = components
      .map((id) => `import { ${capitalizeFirstLetter(id)} } from '@/components/${id}'`)
      .join("\n")

    const componentElements = components.map((id) => `      <${capitalizeFirstLetter(id)} />`).join("\n")

    return `import React from 'react'
${componentImports}

export default function Home() {
  return (
    <main>
${componentElements}
    </main>
  )
}
`
  }

  // Generate layout.tsx content
  const generateLayout = () => {
    return `import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Landing Page',
  description: 'Created with Dynamic Island Landing Page Builder',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
`
  }

  // Generate globals.css content
  const generateGlobalCSS = () => {
    return `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --font-family: "${theme.fontFamily}";
  --primary-color: ${theme.primaryColor};
  --secondary-color: ${theme.secondaryColor};
  --text-color: ${theme.textColor};
  --background-color: ${theme.backgroundColor};
  --border-radius: ${theme.borderRadius};
  --spacing: ${theme.spacing};
  --container-width: ${theme.containerWidth};
}

body {
  font-family: var(--font-family);
  color: var(--text-color);
  background-color: var(--background-color);
}

.container {
  max-width: var(--container-width);
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--spacing);
  padding-right: var(--spacing);
  width: 100%;
}

button, .button {
  border-radius: var(--border-radius);
  transition: background-color 0.3s ease, color 0.3s ease;
}
`
  }

  // Generate component code
  const generateComponentCode = (componentId: string) => {
    // This is a simplified version - in a real implementation, you would generate
    // the actual component code based on the content and structure
    const componentContent = content[componentId] || {}

    // Create a simple representation of the component's content for demonstration
    const contentString = Object.entries(componentContent)
      .map(([key, value]) => `  // ${key}: ${value}`)
      .join("\n")

    return `import React from 'react'

export function ${capitalizeFirstLetter(componentId)}() {
  return (
    <section className="py-20" style={{ backgroundColor: "var(--background-color)" }}>
      <div className="container mx-auto px-4">
        {/* Component content would be generated here based on the builder */}
${contentString}
      </div>
    </section>
  )
}
`
  }

  // Helper function to capitalize the first letter of a string
  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  return (
    <div className="flex justify-center">
      <button
        onClick={handleExportCode}
        disabled={isGenerating || components.length === 0}
        className="bg-blue-600 hover:bg-blue-700 text-white py-1.5 px-3 rounded-md flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed text-xs"
      >
        {isGenerating ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-3 w-3 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Generating...
          </>
        ) : (
          <>
            <svg
              className="w-3 h-3 mr-1.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              ></path>
            </svg>
            Download Code
          </>
        )}
      </button>
    </div>
  )
}

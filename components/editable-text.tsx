"use client"

import type React from "react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { useState, useEffect, useCallback } from "react"
import { useComponentStore } from "@/hooks/use-component-store"
import { cn } from "@/lib/utils"

interface EditableTextProps {
  content: string
  className?: string
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span"
  componentId: string
  elementId: string
  canDelete?: boolean
  style?: React.CSSProperties
}

export function EditableText({
  content,
  className = "",
  tag = "p",
  componentId,
  elementId,
  canDelete = true,
  style = {},
}: EditableTextProps) {
  const {
    content: storedContent,
    updateContent,
    selectElement,
    selectedElement,
    removeSelectedElement,
  } = useComponentStore()
  const [isEditing, setIsEditing] = useState(false)
  const [isSelected, setIsSelected] = useState(false)

  // Check if this element is selected
  useEffect(() => {
    setIsSelected(selectedElement?.componentId === componentId && selectedElement?.elementId === elementId)
  }, [selectedElement, componentId, elementId])

  // Get content from store if available, otherwise use prop
  const savedContent = storedContent[componentId]?.[elementId] || content

  // Process the content to ensure it's clean HTML
  const processContent = useCallback(
    (text: string) => {
      // Strip HTML tags if they exist in the content string
      const cleanText = text.replace(/<\/?[^>]+(>|$)/g, "")
      return `<${tag}>${cleanText}</${tag}>`
    },
    [tag],
  )

  const [htmlContent, setHtmlContent] = useState(processContent(savedContent))

  const editor = useEditor({
    extensions: [StarterKit],
    content: htmlContent,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      setHtmlContent(html)

      // Extract the text content without HTML tags for the update callback
      const tempDiv = document.createElement("div")
      tempDiv.innerHTML = html
      const textContent = tempDiv.textContent || tempDiv.innerText || ""

      updateContent(componentId, elementId, textContent)
    },
    editable: isEditing,
  })

  // Handle keyboard events for element deletion
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isSelected || isEditing) return

      if (canDelete && (e.key === "Delete" || e.key === "Backspace")) {
        e.preventDefault()
        removeSelectedElement()
      }
    }

    if (isSelected) {
      document.addEventListener("keydown", handleKeyDown)
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [isSelected, isEditing, removeSelectedElement, canDelete])

  // Update editor state when isEditing changes
  useEffect(() => {
    if (editor) {
      editor.setEditable(isEditing)

      // Focus the editor when entering edit mode
      if (isEditing) {
        setTimeout(() => {
          editor.commands.focus("end")
        }, 10)
      }
    }
  }, [isEditing, editor])

  // Update content if it changes externally
  useEffect(() => {
    if (editor && !isEditing) {
      const contentToUse = storedContent[componentId]?.[elementId] || content
      editor.commands.setContent(processContent(contentToUse))
    }
  }, [storedContent, componentId, elementId, content, editor, isEditing, processContent])

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent event bubbling

    if (isEditing) return // Don't change selection while editing

    // Toggle selection if already selected, otherwise select this element
    if (isSelected) {
      selectElement(null)
    } else {
      selectElement({ componentId, elementId })
    }
  }

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent event bubbling
    setIsEditing(true)
  }

  const handleBlur = () => {
    setIsEditing(false)
  }

  // Combine the style prop with theme variables
  const combinedStyle: React.CSSProperties = {
    fontFamily: "var(--font-family)",
    transition: "color 0.3s ease, background-color 0.3s ease, font-family 0.3s ease",
    ...style,
  }

  return (
    <div
      className={cn(
        "relative group theme-transition",
        isSelected && !isEditing && "ring-2 ring-opacity-70",
        canDelete && isSelected && !isEditing && "cursor-pointer",
      )}
      style={{
        // Use theme variables for selection ring
        boxShadow: isSelected && !isEditing ? `0 0 0 2px var(--primary-color)` : undefined,
        borderRadius: isSelected && !isEditing ? "var(--border-radius)" : undefined,
      }}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >
      <style jsx global>{`
        /* Remove the blue outline from TipTap's ProseMirror editor */
        .ProseMirror {
          outline: none !important;
          font-family: inherit !important;
          color: inherit !important;
        }
        .ProseMirror-focused {
          outline: none !important;
          box-shadow: none !important;
        }
        /* Remove any other focus indicators */
        .ProseMirror:focus,
        .ProseMirror *:focus {
          outline: none !important;
        }
        /* Apply theme styles to editor content */
        .ProseMirror h1, .ProseMirror h2, .ProseMirror h3, 
        .ProseMirror h4, .ProseMirror h5, .ProseMirror h6, 
        .ProseMirror p, .ProseMirror span {
          font-family: inherit !important;
          color: inherit !important;
          transition: color 0.3s ease, font-family 0.3s ease !important;
        }
      `}</style>
      <EditorContent
        editor={editor}
        className={`${className} ${isEditing ? "cursor-text" : "cursor-pointer"} theme-transition`}
        style={combinedStyle}
        onBlur={handleBlur}
      />
      {!isEditing && !isSelected && (
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-5 transition-all duration-200"></div>
      )}
      {isSelected && !isEditing && canDelete && (
        <div
          className="absolute top-0 right-0 text-white text-xs px-2 py-1 rounded-bl rounded-tr"
          style={{
            backgroundColor: "var(--primary-color)",
            borderBottomLeftRadius: "var(--border-radius)",
            borderTopRightRadius: "var(--border-radius)",
          }}
        >
          Press Delete to remove
        </div>
      )}
    </div>
  )
}

"use client"

import { useState, useEffect, useRef } from "react"

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  // Create a ref to track if we've initialized from localStorage
  const initialized = useRef(false)

  // Initialize state with a function to avoid unnecessary computations
  const [storedValue, setStoredValue] = useState<T>(() => {
    // Don't try to access localStorage during SSR
    if (typeof window === "undefined") return initialValue

    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key)
      // Parse stored json or return initialValue
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(error)
      return initialValue
    }
  })

  // Only sync with localStorage when the key changes
  useEffect(() => {
    if (typeof window === "undefined") return

    // Skip the first render to avoid potential loops with initial value
    if (!initialized.current) {
      initialized.current = true
      return
    }

    try {
      // Update localStorage when the state changes
      window.localStorage.setItem(key, JSON.stringify(storedValue))
    } catch (error) {
      console.error("Error saving to localStorage:", error)
    }
  }, [key, storedValue])

  // Return a wrapped version of useState's setter function that
  // persists the new value to localStorage.
  const setValue = (value: T) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value

      // Save state
      setStoredValue(valueToStore)

      // No need to save to localStorage here as the useEffect will handle that
    } catch (error) {
      console.error(error)
    }
  }

  return [storedValue, setValue]
}

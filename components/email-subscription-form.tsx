"use client"

import type React from "react"
import { useState, useRef, useEffect, createContext, useContext } from "react"
import { Input } from "@/components/ui/input"
import { Check, Loader2, Info } from "lucide-react"
import { cn } from "@/utils/utils"
import { motion, AnimatePresence } from "framer-motion"
import { subscribeToNewsletter, type SubscribeFormData } from "@/actions/subscribe"
import { useFormStatus } from "react-dom"

interface EmailSubscriptionFormProps {
  className?: string
}

// Create a FormContext to pass the theme
const FormContext = createContext<{ theme?: string } | null>(null)

// Form submit button with loading state
function SubscribeButton({ isSubmitted, isAlreadySubscribed }: { isSubmitted: boolean; isAlreadySubscribed: boolean }) {
  const { pending } = useFormStatus()
  const formContext = useContext(FormContext)
  const isMinecraft = formContext?.theme === "minecraft"
  const isTron = formContext?.theme === "tron"

  // Determine which icon to show based on subscription status
  const SuccessIcon = isAlreadySubscribed ? Info : Check

  if (isMinecraft) {
    return (
      <motion.button
        type="submit"
        className={cn(
          "minecraft-button green minecraft-pixelated",
          isSubmitted ? "w-12 p-0 flex items-center justify-center" : "px-6",
        )}
        disabled={pending || isSubmitted}
        style={{
          opacity: isSubmitted ? 1 : undefined,
          minWidth: isSubmitted ? "48px" : "120px",
          fontFamily: "var(--minecraft-heading-font)", // Ensure the button uses the heading font
        }}
        animate={{
          width: isSubmitted ? "48px" : "auto",
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
          duration: 0.3,
        }}
      >
        {pending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <span>WAIT...</span>
          </>
        ) : isSubmitted ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 10,
              delay: 0.1,
            }}
          >
            <SuccessIcon className="h-5 w-5" />
          </motion.div>
        ) : (
          "Join"
        )}
      </motion.button>
    )
  }

  if (isTron) {
    return (
      <motion.button
        type="submit"
        className={cn("tron-button", isSubmitted ? "w-12 p-0 flex items-center justify-center" : "px-6")}
        disabled={pending || isSubmitted}
        style={{
          opacity: isSubmitted ? 1 : undefined,
          minWidth: isSubmitted ? "48px" : "120px",
          fontFamily: "var(--tron-heading-font)",
        }}
        animate={{
          width: isSubmitted ? "48px" : "auto",
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
          duration: 0.3,
        }}
      >
        {pending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <span>PROCESSING</span>
          </>
        ) : isSubmitted ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 10,
              delay: 0.1,
            }}
          >
            <SuccessIcon className="h-5 w-5" />
          </motion.div>
        ) : (
          "Join"
        )}
      </motion.button>
    )
  }

  // Original button code remains here
  return (
    <motion.button
      type="submit"
      className={cn(
        "h-12 bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        "disabled:pointer-events-none",
        isSubmitted ? "rounded-full w-12 p-0" : "px-6",
      )}
      disabled={pending || isSubmitted}
      style={{
        opacity: isSubmitted ? 1 : undefined,
        minWidth: isSubmitted ? "48px" : "120px", // Set minimum width
      }}
      animate={{
        borderRadius: isSubmitted ? "9999px" : "0.375rem",
        width: isSubmitted ? "48px" : "auto",
        padding: isSubmitted ? "0px" : "0 1.5rem",
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
        duration: 0.3,
      }}
      whileHover={!isSubmitted && !pending ? { scale: 1.02 } : {}}
      whileTap={!isSubmitted && !pending ? { scale: 0.98 } : {}}
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          <span>Subscribing...</span>
        </>
      ) : isSubmitted ? (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 10,
            delay: 0.1,
          }}
        >
          <SuccessIcon className="h-5 w-5" />
        </motion.div>
      ) : (
        "Join the Waitlist"
      )}
    </motion.button>
  )
}

export function EmailSubscriptionForm({ className, theme }: EmailSubscriptionFormProps & { theme?: string }) {
  const [email, setEmail] = useState("")
  const [hasError, setHasError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [successMessage, setSuccessMessage] = useState("Thanks for subscribing!")
  const [isAlreadySubscribed, setIsAlreadySubscribed] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  // Anti-spam measures
  const [formLoadTime, setFormLoadTime] = useState<number>(0)
  const [mouseMovements, setMouseMovements] = useState(0)
  const honeyPotRef = useRef<HTMLInputElement>(null)

  // Set form load time when component mounts
  useEffect(() => {
    setFormLoadTime(Date.now())

    // Track mouse movements (bots typically don't move the mouse)
    const handleMouseMove = () => {
      setMouseMovements((prev) => prev + 1)
    }

    document.addEventListener("mousemove", handleMouseMove)
    return () => document.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Email validation function (client-side)
  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Reset error state
    setHasError(false)
    setErrorMessage("")

    // Client-side email validation
    if (!email.trim() || !validateEmail(email)) {
      setHasError(true)
      setErrorMessage("Please enter a valid email address")
      // Focus the input field to draw attention to it
      inputRef.current?.focus()
      return
    }

    try {
      // Prepare form data for server action
      const formData: SubscribeFormData = {
        email,
        formLoadTime,
        mouseMovements,
        honeypot: honeyPotRef.current?.value || "",
      }

      // Call server action
      const result = await subscribeToNewsletter(formData)

      if (result.success) {
        setIsSubmitted(true)
        setSuccessMessage(result.message)

        // Check if the message indicates the user is already subscribed
        if (result.message.includes("already subscribed")) {
          setIsAlreadySubscribed(true)
          // Keep the email in the field for already subscribed users
          // This makes it clearer which email is already registered
        } else {
          setIsAlreadySubscribed(false)
          // Clear the input for new subscriptions
          setEmail("")
        }
      } else {
        setHasError(true)
        setErrorMessage(result.message)
        inputRef.current?.focus()
      }
    } catch (error) {
      console.error("Submission error:", error)
      setHasError(true)
      setErrorMessage("An error occurred. Please try again.")
      inputRef.current?.focus()
    }
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)

    // Clear error state when user starts typing
    if (hasError) {
      setHasError(false)
      setErrorMessage("")
    }

    // If user starts typing again after submission, reset the submitted state
    if (isSubmitted) {
      setIsSubmitted(false)
    }
  }

  return (
    <FormContext.Provider value={{ theme }}>
      <div className={`mx-auto mt-8 max-w-md px-4 ${className || ""}`}>
        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col items-center">
          {/* Honeypot field - hidden from users but bots will fill it */}
          <input
            ref={honeyPotRef}
            type="text"
            name="website"
            tabIndex={-1}
            aria-hidden="true"
            autoComplete="off"
            style={{
              position: "absolute",
              width: "1px",
              height: "1px",
              padding: 0,
              margin: "-1px",
              overflow: "hidden",
              clip: "rect(0, 0, 0, 0)",
              whiteSpace: "nowrap",
              borderWidth: 0,
            }}
          />

          {/* Hidden fields for anti-spam measures */}
          <input type="hidden" name="formLoadTime" value={formLoadTime} />
          <input type="hidden" name="mouseMovements" value={mouseMovements} />

          <motion.div
            className="flex gap-2 w-full"
            layout
            transition={{
              layout: { type: "spring", stiffness: 300, damping: 25 },
            }}
          >
            <AnimatePresence mode="popLayout">
              {!isSubmitted && (
                <motion.div
                  className="relative flex-1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  key="email-input"
                >
                  <Input
                    ref={inputRef}
                    type="email"
                    placeholder="Enter your email"
                    className={cn(
                      "h-12 bg-background/50 backdrop-blur-sm border-border/50 focus-visible:ring-primary",
                      hasError && "border-red-500 focus-visible:ring-red-500 ring-2 ring-red-500",
                      theme === "minecraft" && "minecraft-input minecraft-pixelated",
                      theme === "tron" &&
                        "border-primary/50 focus-visible:border-primary focus-visible:ring-primary bg-black/30",
                    )}
                    value={email}
                    onChange={handleEmailChange}
                    aria-invalid={hasError}
                    aria-describedby={hasError ? "email-error" : undefined}
                    disabled={isSubmitted}
                  />
                  {hasError && errorMessage && (
                    <div id="email-error" className="text-red-500 text-xs mt-1">
                      {errorMessage}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              layout
              className={cn("flex justify-center", isSubmitted ? "mx-auto" : "")}
              transition={{
                layout: { type: "spring", stiffness: 300, damping: 25 },
              }}
            >
              <SubscribeButton isSubmitted={isSubmitted} isAlreadySubscribed={isAlreadySubscribed} />
            </motion.div>
          </motion.div>

          <motion.p
            className={cn(
              "text-sm mt-2",
              isAlreadySubscribed ? "text-amber-500 dark:text-amber-400" : "text-muted-foreground",
              theme === "tron" ? "text-left" : "text-center",
            )}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            key={isSubmitted ? "success" : "default"}
          >
            {isSubmitted ? successMessage : "Join our waitlist for early access"}
          </motion.p>
        </form>
      </div>
    </FormContext.Provider>
  )
}

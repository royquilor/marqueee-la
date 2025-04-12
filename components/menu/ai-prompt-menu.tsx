"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, Loader2, AlertCircle, Settings, CheckCircle, XCircle } from "lucide-react"
import { generateTheme, generatePersonalizedTheme } from "@/lib/ai"
import { generateSection, analyzeSection } from "@/lib/ai-service"
import { testAnthropicApi } from "@/lib/test-api"
import type { Section, Theme } from "@/lib/types"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface AiPromptMenuProps {
  credits: number
  useAiCredit: () => boolean
  onUpdateTheme: (theme: Partial<Theme>) => void
  onBack: () => void
  onAddGeneratedSection?: (sectionType: string, code: string, variant: number) => void
  sections?: Section[]
  selectedSectionId?: string | null
  theme: Theme
}

export function AiPromptMenu({
  credits,
  useAiCredit,
  onUpdateTheme,
  onBack,
  onAddGeneratedSection,
  sections = [],
  selectedSectionId,
  theme,
}: AiPromptMenuProps) {
  const [prompt, setPrompt] = useState("")
  const [tone, setTone] = useState("")
  const [layout, setLayout] = useState("")
  const [style, setStyle] = useState("")
  const [activeTab, setActiveTab] = useState("theme")
  const [sectionType, setSectionType] = useState("hero")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [apiAvailable, setApiAvailable] = useState(true)
  const [generatingTheme, setGeneratingTheme] = useState(false)
  const [generatingSection, setGeneratingSection] = useState(false)
  const [analyzingSection, setAnalyzingSection] = useState(false)
  const [isCreditBeingUsed, setIsCreditBeingUsed] = useState(false)
  const [testingApi, setTestingApi] = useState(false)
  const [apiTestResult, setApiTestResult] = useState<{
    success?: boolean
    message?: string
    apiKeyPresent?: boolean
  }>({})

  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const { toast } = useToast()

  // Simplify the credit check logic - directly use the credits prop
  const canGenerate = credits > 0

  // Log credits for debugging
  useEffect(() => {
    console.log("Current credits in AiPromptMenu:", credits)
  }, [credits])

  // Auto-resize textarea based on content
  useEffect(() => {
    const textarea = textareaRef.current
    if (!textarea) return

    const adjustHeight = () => {
      textarea.style.height = "auto"
      const scrollHeight = textarea.scrollHeight
      textarea.style.height = `${Math.min(scrollHeight, 100)}px`
    }

    adjustHeight()
    textarea.addEventListener("input", adjustHeight)

    return () => {
      textarea.removeEventListener("input", adjustHeight)
    }
  }, [])

  // Get the selected section if available
  const selectedSection = selectedSectionId ? sections.find((section) => section.id === selectedSectionId) : null

  // Function to test the API connection
  const handleTestApi = useCallback(async () => {
    setTestingApi(true)
    try {
      const result = await testAnthropicApi()
      setApiTestResult(result)
      setApiAvailable(result.success || false)

      toast({
        title: result.success ? "API Test Successful" : "API Test Failed",
        description: result.message,
        variant: result.success ? "default" : "destructive",
      })
    } catch (error) {
      console.error("Error testing API:", error)
      setApiTestResult({
        success: false,
        message: "An unexpected error occurred while testing the API",
        apiKeyPresent: false,
      })
      setApiAvailable(false)

      toast({
        title: "API Test Failed",
        description: "An unexpected error occurred while testing the API",
        variant: "destructive",
      })
    } finally {
      setTestingApi(false)
    }
  }, [toast])

  const handleGenerateTheme = useCallback(async () => {
    // Check if we have either a prompt or at least one dropdown selection
    const hasPrompt = prompt.trim().length > 0
    const hasSelection = tone || layout || style

    if (!hasPrompt && !hasSelection) {
      toast({
        title: "Input required",
        description: "Please enter a prompt or select at least one option",
        variant: "destructive",
      })
      return
    }

    if (!canGenerate) {
      toast({
        title: "No credits left",
        description: "You've used all your AI credits",
        variant: "destructive",
      })
      return
    }

    setGeneratingTheme(true)
    setIsCreditBeingUsed(true)

    // Use a credit before generating
    const creditUsed = useAiCredit()
    if (!creditUsed) {
      toast({
        title: "Failed to use credit",
        description: "Could not use an AI credit. Please try again.",
        variant: "destructive",
      })
      setGeneratingTheme(false)
      setIsCreditBeingUsed(false)
      return
    }

    try {
      let newTheme: Partial<Theme>

      if (hasPrompt) {
        // If we have a prompt, use the text-based generation
        newTheme = await generateTheme(prompt)
      } else {
        // Otherwise use the personalized generation with dropdown selections
        newTheme = await generatePersonalizedTheme({
          targetUser: tone,
          industry: layout,
          productType: style,
        })
      }

      onUpdateTheme(newTheme)
      toast({
        title: "Theme generated",
        description: "Your new theme has been applied",
      })
    } catch (error) {
      toast({
        title: "Generation failed",
        description: "Failed to generate theme. Please try again.",
        variant: "destructive",
      })
    } finally {
      setGeneratingTheme(false)
      setIsCreditBeingUsed(false)
    }
  }, [prompt, tone, layout, style, canGenerate, onUpdateTheme, toast, useAiCredit])

  const handleGenerateSection = useCallback(async () => {
    if (!prompt.trim()) {
      toast({
        title: "Input required",
        description: "Please enter a description for the section you want to generate",
        variant: "destructive",
      })
      return
    }

    if (!canGenerate) {
      toast({
        title: "No credits left",
        description: "You've used all your AI credits",
        variant: "destructive",
      })
      return
    }

    if (!onAddGeneratedSection) {
      toast({
        title: "Feature not available",
        description: "Section generation is not available in this context",
        variant: "destructive",
      })
      return
    }

    setGeneratingSection(true)
    setIsCreditBeingUsed(true)

    // Use a credit before generating
    const creditUsed = useAiCredit()
    if (!creditUsed) {
      toast({
        title: "Failed to use credit",
        description: "Could not use an AI credit. Please try again.",
        variant: "destructive",
      })
      setGeneratingSection(false)
      setIsCreditBeingUsed(false)
      return
    }

    try {
      console.log("Generating section with theme:", theme)
      // Generate the section code using our server action with the current theme
      const result = await generateSection(sectionType, prompt, theme)
      console.log("Generated section result:", result)

      // Add the generated section to the canvas
      onAddGeneratedSection(sectionType, result.code, result.variant)

      toast({
        title: "Section generated",
        description: `Your ${sectionType} section has been added to the canvas`,
      })

      // Clear the prompt after successful generation
      setPrompt("")
    } catch (error) {
      console.error("Section generation error:", error)

      toast({
        title: "Generation failed",
        description: "Failed to generate section. Please try again.",
        variant: "destructive",
      })
    } finally {
      setGeneratingSection(false)
      setIsCreditBeingUsed(false)
    }
  }, [prompt, sectionType, canGenerate, onAddGeneratedSection, toast, useAiCredit, theme])

  const handleAnalyzeSection = useCallback(async () => {
    if (!selectedSection) {
      toast({
        title: "No section selected",
        description: "Please select a section to analyze",
        variant: "destructive",
      })
      return
    }

    if (!canGenerate) {
      toast({
        title: "No credits left",
        description: "You've used all your AI credits",
        variant: "destructive",
      })
      return
    }

    setAnalyzingSection(true)
    setIsCreditBeingUsed(true)

    // Use a credit before analyzing
    const creditUsed = useAiCredit()
    if (!creditUsed) {
      toast({
        title: "Failed to use credit",
        description: "Could not use an AI credit. Please try again.",
        variant: "destructive",
      })
      setAnalyzingSection(false)
      setIsCreditBeingUsed(false)
      return
    }

    try {
      // For now, we'll use a placeholder for the current code
      // In a real implementation, you would need to get the actual code for the selected section
      const currentCode = `// Placeholder for ${selectedSection.type} section code (variant ${selectedSection.variant})`

      // Analyze the section using our server action
      const result = await analyzeSection(selectedSection, currentCode)

      // Update the suggestions state
      setSuggestions(result.suggestions)

      toast({
        title: "Analysis complete",
        description: `Analysis of ${selectedSection.type} section complete`,
      })
    } catch (error) {
      console.error("Analysis error:", error)

      toast({
        title: "Analysis failed",
        description: "Failed to analyze section. Please try again.",
        variant: "destructive",
      })
    } finally {
      setAnalyzingSection(false)
      setIsCreditBeingUsed(false)
    }
  }, [selectedSection, canGenerate, toast, useAiCredit])

  // Move useAiCredit call outside of conditional blocks
  const [creditUsed, setCreditUsed] = useState(false)

  useEffect(() => {
    if (isCreditBeingUsed) {
      const used = useAiCredit()
      setCreditUsed(used)
    }
  }, [isCreditBeingUsed, useAiCredit])

  return (
    <div className="flex flex-col gap-2 w-full max-w-[320px]">
      {/* Header */}
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={onBack} className="shrink-0 h-7 w-7 p-0">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
          <span className="text-sm font-medium">AI</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-xs text-muted-foreground shrink-0">Credits: {credits}</div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleTestApi}
            className="shrink-0 h-7 w-7 p-0"
            disabled={testingApi}
          >
            {testingApi ? <Loader2 className="h-4 w-4 animate-spin" /> : <Settings className="h-4 w-4" />}
            <span className="sr-only">Test API</span>
          </Button>
        </div>
      </div>

      {/* API Warning */}
      {!apiAvailable && (
        <Alert variant="warning" className="py-2">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle className="text-xs font-medium">API Key Missing</AlertTitle>
          <AlertDescription className="text-xs">
            Using fallback responses. Add ANTHROPIC_API_KEY to enable AI features.
          </AlertDescription>
        </Alert>
      )}

      {/* API Test Result */}
      {apiTestResult.message && (
        <Alert variant={apiTestResult.success ? "default" : "destructive"} className="py-2">
          {apiTestResult.success ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
          <AlertTitle className="text-xs font-medium">
            {apiTestResult.success ? "API Connected" : "API Error"}
          </AlertTitle>
          <AlertDescription className="text-xs">{apiTestResult.message}</AlertDescription>
        </Alert>
      )}

      {/* Tabs for different AI features */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 h-7">
          <TabsTrigger value="theme" className="text-xs h-6">
            Theme
          </TabsTrigger>
          <TabsTrigger value="generate" className="text-xs h-6">
            Generate
          </TabsTrigger>
          <TabsTrigger value="analyze" className="text-xs h-6">
            Analyze
          </TabsTrigger>
        </TabsList>

        {/* Theme Generation Tab */}
        <TabsContent value="theme" className="mt-2 space-y-2">
          <Textarea
            ref={textareaRef}
            placeholder="Describe your theme..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-[32px] py-1 px-2 resize-none text-xs w-full"
          />

          <div className="flex flex-col gap-2 w-full">
            <div className="flex items-center gap-2 w-full">
              <span className="text-xs whitespace-nowrap flex-[0.3]">Tone:</span>
              <div className="flex-[0.7] w-full">
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger className="w-full h-7 text-xs px-2 py-0">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Professionals">Professional</SelectItem>
                    <SelectItem value="Designers">Playful</SelectItem>
                    <SelectItem value="Entrepreneurs">Bold</SelectItem>
                    <SelectItem value="Students">Casual</SelectItem>
                    <SelectItem value="Seniors">Elegant</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full">
              <span className="text-xs whitespace-nowrap flex-[0.3]">Layout:</span>
              <div className="flex-[0.7] w-full">
                <Select value={layout} onValueChange={setLayout}>
                  <SelectTrigger className="w-full h-7 text-xs px-2 py-0">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Technology">Classic</SelectItem>
                    <SelectItem value="Entertainment">Grid</SelectItem>
                    <SelectItem value="Education">Spacious</SelectItem>
                    <SelectItem value="Retail">Compact</SelectItem>
                    <SelectItem value="Healthcare">Balanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full">
              <span className="text-xs whitespace-nowrap flex-[0.3]">Style:</span>
              <div className="flex-[0.7] w-full">
                <Select value={style} onValueChange={setStyle}>
                  <SelectTrigger className="w-full h-7 text-xs px-2 py-0">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Landing Page">Minimal</SelectItem>
                    <SelectItem value="Corporate">Modern</SelectItem>
                    <SelectItem value="E-commerce">Vibrant</SelectItem>
                    <SelectItem value="Blog">Subtle</SelectItem>
                    <SelectItem value="Portfolio">Artistic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Button
            onClick={() => {
              if (canGenerate && !generatingTheme && !isCreditBeingUsed) {
                setIsCreditBeingUsed(true)
                // const creditUsed = useAiCredit(); // No longer calling hook here
                if (creditUsed) {
                  handleGenerateTheme()
                } else {
                  toast({
                    title: "Failed to use credit",
                    description: "Could not use an AI credit. Please try again.",
                    variant: "destructive",
                  })
                  setIsCreditBeingUsed(false)
                }
              } else if (!canGenerate) {
                toast({
                  title: "No credits left",
                  description: "You've used all your AI credits",
                  variant: "destructive",
                })
              }
            }}
            disabled={
              generatingTheme || (!prompt.trim() && !tone && !layout && !style) || !canGenerate || isCreditBeingUsed
            }
            size="sm"
            variant="primary"
            className="h-7 text-xs px-2 mt-1 w-full"
          >
            {generatingTheme ? (
              <>
                <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              "Generate Theme"
            )}
          </Button>
        </TabsContent>

        {/* Section Generation Tab */}
        <TabsContent value="generate" className="mt-2 space-y-2">
          <div className="flex items-center gap-2 w-full">
            <span className="text-xs whitespace-nowrap flex-[0.3]">Section:</span>
            <div className="flex-[0.7] w-full">
              <Select value={sectionType} onValueChange={setSectionType}>
                <SelectTrigger className="w-full h-7 text-xs px-2 py-0">
                  <SelectValue placeholder="Select section type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hero">Hero</SelectItem>
                  <SelectItem value="features">Features</SelectItem>
                  <SelectItem value="pricing">Pricing</SelectItem>
                  <SelectItem value="testimonials">Testimonials</SelectItem>
                  <SelectItem value="cta">CTA</SelectItem>
                  <SelectItem value="footer">Footer</SelectItem>
                  <SelectItem value="nav">Navigation</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Textarea
            placeholder="Describe the section you want to generate..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-[80px] py-1 px-2 resize-none text-xs w-full"
          />

          <Button
            onClick={() => {
              if (canGenerate && onAddGeneratedSection && !generatingSection && !isCreditBeingUsed) {
                setIsCreditBeingUsed(true)
                // const creditUsed = useAiCredit(); // No longer calling hook here
                if (creditUsed) {
                  handleGenerateSection()
                } else {
                  toast({
                    title: "Failed to use credit",
                    description: "Could not use an AI credit. Please try again.",
                    variant: "destructive",
                  })
                  setIsCreditBeingUsed(false)
                }
              } else if (!canGenerate) {
                toast({
                  title: "No credits left",
                  description: "You've used all your AI credits",
                  variant: "destructive",
                })
              } else if (!onAddGeneratedSection) {
                toast({
                  title: "Feature not available",
                  description: "Section generation is not available in this context",
                  variant: "destructive",
                })
              }
            }}
            disabled={
              generatingSection || !prompt.trim() || !canGenerate || !onAddGeneratedSection || isCreditBeingUsed
            }
            size="sm"
            variant="primary"
            className="h-7 text-xs px-2 mt-1 w-full"
          >
            {generatingSection ? (
              <>
                <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              "Generate Section"
            )}
          </Button>
        </TabsContent>

        {/* Section Analysis Tab */}
        <TabsContent value="analyze" className="mt-2 space-y-2">
          <div className="text-xs text-muted-foreground mb-2">
            {selectedSection
              ? `Selected: ${selectedSection.type} (variant ${selectedSection.variant})`
              : "No section selected. Please select a section on the canvas to analyze."}
          </div>

          <Button
            onClick={() => {
              if (canGenerate && selectedSection && !analyzingSection && !isCreditBeingUsed) {
                setIsCreditBeingUsed(true)
                // const creditUsed = useAiCredit(); // No longer calling hook here
                if (creditUsed) {
                  handleAnalyzeSection()
                } else {
                  toast({
                    title: "Failed to use credit",
                    description: "Could not use an AI credit. Please try again.",
                    variant: "destructive",
                  })
                  setIsCreditBeingUsed(false)
                }
              } else if (!canGenerate) {
                toast({
                  title: "No credits left",
                  description: "You've used all your AI credits",
                  variant: "destructive",
                })
              } else if (!selectedSection) {
                toast({
                  title: "No section selected",
                  description: "Please select a section to analyze",
                  variant: "destructive",
                })
              }
            }}
            disabled={analyzingSection || !selectedSection || !canGenerate || isCreditBeingUsed}
            size="sm"
            variant="outline"
            className="h-7 text-xs px-2 w-full"
          >
            {analyzingSection ? (
              <>
                <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                <span>Analyzing...</span>
              </>
            ) : (
              "Analyze Section"
            )}
          </Button>

          {suggestions.length > 0 && (
            <div className="mt-2 space-y-2">
              <h4 className="text-xs font-medium">Suggestions:</h4>
              <ul className="text-xs space-y-1">
                {suggestions.map((suggestion, index) => (
                  <li key={index} className="flex items-start gap-1">
                    <span className="text-primary">•</span>
                    <span>{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

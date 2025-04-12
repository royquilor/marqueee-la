"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Loader2, CheckCircle, XCircle } from "lucide-react"
import { testAnthropicApi } from "@/lib/test-api"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface ApiTestMenuProps {
  onBack: () => void
}

export function ApiTestMenu({ onBack }: ApiTestMenuProps) {
  const [isTesting, setIsTesting] = useState(false)
  const [testResult, setTestResult] = useState<{
    success?: boolean
    message?: string
    apiKeyPresent?: boolean
  }>({})

  const handleTestApi = useCallback(async () => {
    setIsTesting(true)
    try {
      const result = await testAnthropicApi()
      setTestResult(result)
    } catch (error) {
      console.error("Error in test:", error)
      setTestResult({
        success: false,
        message: "An unexpected error occurred while testing the API",
        apiKeyPresent: false,
      })
    } finally {
      setIsTesting(false)
    }
  }, [])

  return (
    <div className="flex flex-col gap-2 w-full max-w-[320px]">
      {/* Header */}
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={onBack} className="shrink-0 h-7 w-7 p-0">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
          <span className="text-sm font-medium">API Test</span>
        </div>
      </div>

      <div className="space-y-4 mt-2">
        <p className="text-xs text-muted-foreground">
          Test your Anthropic API connection to ensure it's properly configured.
        </p>

        <Button
          onClick={handleTestApi}
          disabled={isTesting}
          size="sm"
          variant="outline"
          className="h-8 text-xs px-2 w-full"
        >
          {isTesting ? (
            <>
              <Loader2 className="h-3 w-3 mr-1 animate-spin" />
              <span>Testing API...</span>
            </>
          ) : (
            "Test Anthropic API"
          )}
        </Button>

        {testResult.message && (
          <Alert variant={testResult.success ? "default" : "destructive"} className="py-2">
            {testResult.success ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
            <AlertTitle className="text-xs font-medium">{testResult.success ? "Success" : "Error"}</AlertTitle>
            <AlertDescription className="text-xs">
              {testResult.message}
              {!testResult.apiKeyPresent && (
                <div className="mt-1">Make sure you've added the ANTHROPIC_API_KEY to your environment variables.</div>
              )}
            </AlertDescription>
          </Alert>
        )}

        <div className="text-xs space-y-2 mt-4">
          <h3 className="font-medium">Troubleshooting Tips:</h3>
          <ul className="list-disc pl-4 space-y-1">
            <li>Verify your API key is correctly set in the environment variables</li>
            <li>Check that your API key is valid and has not expired</li>
            <li>Ensure you have sufficient credits in your Anthropic account</li>
            <li>Check for any network issues that might prevent API calls</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

"use client"

import { EditableText } from "../editable-text"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PricingProps {
  variant?: number
}

export function Pricing({ variant = 0 }: PricingProps) {
  const componentId = "pricing"

  const plans = [
    {
      name: "Basic",
      price: "$9",
      period: "per month",
      description: "Perfect for individuals and small projects",
      features: ["Up to 5 pages", "Basic components", "Standard support", "1 GB storage"],
      cta: "Get Started",
      highlighted: false,
    },
    {
      name: "Pro",
      price: "$29",
      period: "per month",
      description: "Ideal for growing businesses",
      features: ["Unlimited pages", "All components", "Priority support", "10 GB storage", "Custom domain"],
      cta: "Get Started",
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "$99",
      period: "per month",
      description: "For large organizations",
      features: [
        "Unlimited pages",
        "All components",
        "24/7 support",
        "100 GB storage",
        "Custom domain",
        "Advanced analytics",
      ],
      cta: "Contact Sales",
      highlighted: false,
    },
  ]

  // Render different variants based on the variant prop
  switch (variant) {
    case 1:
      // Horizontal pricing table
      return (
        <section className="py-40 theme-transition" style={{ backgroundColor: "#f9fafb" }}>
          <div className="container-enforcer mx-auto px-4" style={{ maxWidth: "var(--container-width)" }}>
            <div className="text-center mb-16">
              <EditableText
                content="Simple, Transparent Pricing"
                className="text-3xl font-bold mb-4"
                tag="h2"
                componentId={componentId}
                elementId="title"
                style={{
                  color: "var(--text-color)",
                  fontFamily: "var(--font-family)",
                  marginBottom: "1rem",
                }}
              />
              <EditableText
                content="Choose the plan that works best for you and your team."
                className="text-lg max-w-2xl mx-auto"
                tag="p"
                componentId={componentId}
                elementId="subtitle"
                style={{ color: "var(--secondary-color)" }}
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="text-left p-4" style={{ backgroundColor: "rgba(0,0,0,0.03)" }}>
                      <span className="font-medium">Plan</span>
                    </th>
                    {plans.map((plan, index) => (
                      <th
                        key={index}
                        className="p-4 text-center"
                        style={{
                          backgroundColor: plan.highlighted ? "var(--primary-color)" : "rgba(0,0,0,0.03)",
                          color: plan.highlighted ? "#ffffff" : "var(--text-color)",
                          borderTopLeftRadius: index === 0 ? "var(--border-radius)" : 0,
                          borderTopRightRadius: index === plans.length - 1 ? "var(--border-radius)" : 0,
                        }}
                      >
                        <EditableText
                          content={plan.name}
                          className="text-xl font-bold"
                          tag="span"
                          componentId={componentId}
                          elementId={`plan-${index}-name`}
                          style={{ color: plan.highlighted ? "#ffffff" : "var(--text-color)" }}
                        />
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-4 border-t" style={{ borderColor: "rgba(0,0,0,0.1)" }}>
                      Price
                    </td>
                    {plans.map((plan, index) => (
                      <td key={index} className="p-4 text-center border-t" style={{ borderColor: "rgba(0,0,0,0.1)" }}>
                        <div className="font-bold text-2xl">
                          <EditableText
                            content={plan.price}
                            tag="span"
                            componentId={componentId}
                            elementId={`plan-${index}-price`}
                            style={{ color: "var(--text-color)" }}
                          />
                        </div>
                        <div className="text-sm">
                          <EditableText
                            content={plan.period}
                            tag="span"
                            componentId={componentId}
                            elementId={`plan-${index}-period`}
                            style={{ color: "var(--secondary-color)" }}
                          />
                        </div>
                      </td>
                    ))}
                  </tr>
                  {/* Features rows */}
                  {plans[0].features.map((_, featureIndex) => (
                    <tr key={featureIndex}>
                      <td className="p-4 border-t" style={{ borderColor: "rgba(0,0,0,0.1)" }}>
                        Feature {featureIndex + 1}
                      </td>
                      {plans.map((plan, planIndex) => (
                        <td
                          key={planIndex}
                          className="p-4 text-center border-t"
                          style={{ borderColor: "rgba(0,0,0,0.1)" }}
                        >
                          {plan.features[featureIndex] ? (
                            <EditableText
                              content={plan.features[featureIndex]}
                              className="text-sm"
                              tag="span"
                              componentId={componentId}
                              elementId={`plan-${planIndex}-feature-${featureIndex}`}
                              style={{ color: "var(--secondary-color)" }}
                            />
                          ) : (
                            <span className="text-gray-400">—</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr>
                    <td className="p-4 border-t" style={{ borderColor: "rgba(0,0,0,0.1)" }}></td>
                    {plans.map((plan, index) => (
                      <td key={index} className="p-4 text-center border-t" style={{ borderColor: "rgba(0,0,0,0.1)" }}>
                        <Button
                          onClick={(e) => e.stopPropagation()}
                          className="w-full font-medium"
                          style={{
                            backgroundColor: plan.highlighted ? "var(--primary-color)" : "#f3f4f6",
                            color: plan.highlighted ? "#ffffff" : "var(--text-color)",
                            borderRadius: "var(--border-radius)",
                          }}
                        >
                          <EditableText
                            content={plan.cta}
                            className="font-medium"
                            tag="span"
                            componentId={componentId}
                            elementId={`plan-${index}-cta`}
                          />
                        </Button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )

    default:
      // Default card layout (original)
      return (
        <section className="py-40 theme-transition" style={{ backgroundColor: "#f9fafb" }}>
          <div className="container-enforcer mx-auto px-4" style={{ maxWidth: "var(--container-width)" }}>
            <div className="text-center mb-16">
              <EditableText
                content="Simple, Transparent Pricing"
                className="text-3xl font-bold mb-4"
                tag="h2"
                componentId={componentId}
                elementId="title"
                style={{
                  color: "var(--text-color)",
                  fontFamily: "var(--font-family)",
                  marginBottom: "1rem",
                }}
              />
              <EditableText
                content="Choose the plan that works best for you and your team."
                className="text-lg max-w-2xl mx-auto"
                tag="p"
                componentId={componentId}
                elementId="subtitle"
                style={{ color: "var(--secondary-color)" }}
              />
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {plans.map((plan, index) => (
                <div
                  key={index}
                  className="bg-white overflow-hidden theme-transition"
                  style={{
                    backgroundColor: "var(--background-color)",
                    borderRadius: "var(--border-radius)",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                    border: plan.highlighted ? `2px solid var(--primary-color)` : "1px solid #e5e7eb",
                  }}
                >
                  <div
                    className=""
                    style={{
                      paddingTop: "var(--spacing)",
                      paddingRight: "var(--spacing)",
                      paddingBottom: "var(--spacing)",
                      paddingLeft: "var(--spacing)",
                    }}
                  >
                    <EditableText
                      content={plan.name}
                      className="text-xl font-bold mb-2"
                      tag="h3"
                      componentId={componentId}
                      elementId={`plan-${index}-name`}
                      style={{ color: "var(--text-color)" }}
                    />
                    <div className="mb-4">
                      <EditableText
                        content={plan.price}
                        className="text-3xl font-bold"
                        tag="span"
                        componentId={componentId}
                        elementId={`plan-${index}-price`}
                        style={{ color: "var(--text-color)" }}
                      />
                      <EditableText
                        content={` ${plan.period}`}
                        className="text-gray-600"
                        tag="span"
                        componentId={componentId}
                        elementId={`plan-${index}-period`}
                        style={{ color: "var(--secondary-color)" }}
                      />
                    </div>
                    <EditableText
                      content={plan.description}
                      className="text-gray-600 mb-6"
                      tag="p"
                      componentId={componentId}
                      elementId={`plan-${index}-description`}
                      style={{ color: "var(--secondary-color)" }}
                    />
                    <Button
                      onClick={(e) => e.stopPropagation()}
                      className="w-full font-medium"
                      style={{
                        backgroundColor: plan.highlighted ? "var(--primary-color)" : "#f3f4f6",
                        color: plan.highlighted ? "#ffffff" : "var(--text-color)",
                        borderRadius: "var(--border-radius)",
                      }}
                    >
                      <EditableText
                        content={plan.cta}
                        className="font-medium"
                        tag="span"
                        componentId={componentId}
                        elementId={`plan-${index}-cta`}
                      />
                    </Button>
                  </div>
                  <div
                    className=""
                    style={{
                      paddingTop: "var(--spacing)",
                      paddingRight: "var(--spacing)",
                      paddingBottom: "var(--spacing)",
                      paddingLeft: "var(--spacing)",
                    }}
                  >
                    <p className="text-sm font-medium mb-4" style={{ color: "var(--text-color)" }}>
                      What's included:
                    </p>
                    <ul className="space-y-2">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-green-500 mr-2">
                            <Check size={16} className="text-green-500" />
                          </span>
                          <EditableText
                            content={feature}
                            className="text-sm"
                            tag="span"
                            componentId={componentId}
                            elementId={`plan-${index}-feature-${i}`}
                            style={{ color: "var(--secondary-color)" }}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )
  }
}

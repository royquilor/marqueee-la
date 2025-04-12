"use client"

import { EditableText } from "../editable-text"

interface FooterProps {
  variant?: number
}

export function Footer({ variant = 0 }: FooterProps) {
  const componentId = "footer"

  // Render different variants based on the variant prop
  switch (variant) {
    case 1:
      // Simple footer with minimal content
      return (
        <footer className="theme-transition" style={{ backgroundColor: "#111827" }}>
          <div
            className="container-enforcer mx-auto px-4 py-8"
            style={{
              maxWidth: "var(--container-width)",
              padding: "var(--spacing)",
            }}
          >
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <EditableText
                  content="Brand"
                  className="text-white text-sm font-semibold"
                  tag="h3"
                  componentId={componentId}
                  elementId="brand"
                  style={{
                    color: "#ffffff",
                    fontFamily: "var(--font-family)",
                  }}
                />
              </div>
              <div className="flex space-x-6 text-sm">
                <a href="#" className="text-gray-400 hover:text-white theme-transition">
                  Twitter
                </a>
                <a href="#" className="text-gray-400 hover:text-white theme-transition">
                  LinkedIn
                </a>
                <a href="#" className="text-gray-400 hover:text-white theme-transition">
                  GitHub
                </a>
                <a href="#" className="text-gray-400 hover:text-white theme-transition">
                  Contact
                </a>
              </div>
            </div>
            <div className="mt-8 pt-4 border-t border-gray-800 text-xs text-center">
              <p style={{ color: "rgba(255, 255, 255, 0.7)" }}>
                © {new Date().getFullYear()} Brand. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      )

    default:
      // Default footer (original)
      return (
        <footer className="text-gray-300 theme-transition" style={{ backgroundColor: "#111827" }}>
          <div
            className="container-enforcer mx-auto"
            style={{
              maxWidth: "var(--container-width)",
              paddingLeft: "var(--spacing)",
              paddingRight: "var(--spacing)",
              paddingTop: "calc(var(--spacing) * 3)",
              paddingBottom: "calc(var(--spacing) * 3)",
            }}
          >
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <EditableText
                  content="Brand"
                  className="text-white text-sm font-semibold mb-4"
                  tag="h3"
                  componentId={componentId}
                  elementId="brand"
                  style={{
                    color: "#ffffff",
                    fontFamily: "var(--font-family)",
                    marginBottom: "1rem",
                  }}
                />
                <EditableText
                  content="Building the future of web design, one component at a time."
                  className="mb-4 text-sm"
                  tag="p"
                  componentId={componentId}
                  elementId="tagline"
                  style={{ color: "rgba(255, 255, 255, 0.7)" }}
                />
                <div className="flex space-x-4 text-sm">
                  <a
                    href="#"
                    className="hover:text-white theme-transition"
                    style={{ color: "rgba(255, 255, 255, 0.7)" }}
                  >
                    Twitter
                  </a>
                  <a
                    href="#"
                    className="hover:text-white theme-transition"
                    style={{ color: "rgba(255, 255, 255, 0.7)" }}
                  >
                    LinkedIn
                  </a>
                  <a
                    href="#"
                    className="hover:text-white theme-transition"
                    style={{ color: "rgba(255, 255, 255, 0.7)" }}
                  >
                    GitHub
                  </a>
                </div>
              </div>
              <div>
                <EditableText
                  content="Product"
                  className="text-white text-sm font-semibold mb-4"
                  tag="h4"
                  componentId={componentId}
                  elementId="product-heading"
                  style={{
                    color: "#ffffff",
                    fontFamily: "var(--font-family)",
                    marginBottom: "1rem",
                  }}
                />
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="#"
                      className="hover:text-white theme-transition"
                      style={{ color: "rgba(255, 255, 255, 0.7)" }}
                    >
                      Features
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-white theme-transition"
                      style={{ color: "rgba(255, 255, 255, 0.7)" }}
                    >
                      Pricing
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-white theme-transition"
                      style={{ color: "rgba(255, 255, 255, 0.7)" }}
                    >
                      Testimonials
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-white theme-transition"
                      style={{ color: "rgba(255, 255, 255, 0.7)" }}
                    >
                      FAQ
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <EditableText
                  content="Company"
                  className="text-white text-sm font-semibold mb-4"
                  tag="h4"
                  componentId={componentId}
                  elementId="company-heading"
                  style={{
                    color: "#ffffff",
                    fontFamily: "var(--font-family)",
                    marginBottom: "1rem",
                  }}
                />
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="#"
                      className="hover:text-white theme-transition"
                      style={{ color: "rgba(255, 255, 255, 0.7)" }}
                    >
                      About
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-white theme-transition"
                      style={{ color: "rgba(255, 255, 255, 0.7)" }}
                    >
                      Blog
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-white theme-transition"
                      style={{ color: "rgba(255, 255, 255, 0.7)" }}
                    >
                      Careers
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-white theme-transition"
                      style={{ color: "rgba(255, 255, 255, 0.7)" }}
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <EditableText
                  content="Legal"
                  className="text-white text-sm font-semibold mb-4"
                  tag="h4"
                  componentId={componentId}
                  elementId="legal-heading"
                  style={{
                    color: "#ffffff",
                    fontFamily: "var(--font-family)",
                    marginBottom: "1rem",
                  }}
                />
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="#"
                      className="hover:text-white theme-transition"
                      style={{ color: "rgba(255, 255, 255, 0.7)" }}
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-white theme-transition"
                      style={{ color: "rgba(255, 255, 255, 0.7)" }}
                    >
                      Terms of Service
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-white theme-transition"
                      style={{ color: "rgba(255, 255, 255, 0.7)" }}
                    >
                      Cookie Policy
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-12 pt-8 text-xs text-center">
              <p style={{ color: "rgba(255, 255, 255, 0.7)" }}>
                © {new Date().getFullYear()} Brand. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      )
  }
}

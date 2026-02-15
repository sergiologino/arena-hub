import { describe, it, expect } from "vitest"
import { ROAST_SYSTEM_PROMPT, buildUserPrompt, buildUserPromptPro } from "./roast"
import { CHECK_SYSTEM_PROMPT, buildCheckPrompt } from "./ship"
import { PAYWALL_SYSTEM_PROMPT, buildPaywallPrompt, buildPaywallPromptPro } from "./paywall"

describe("roast prompts", () => {
  it("system prompt mentions 8 categories", () => {
    expect(ROAST_SYSTEM_PROMPT).toContain("8 categories")
  })
  it("buildUserPrompt includes URL and page text", () => {
    const prompt = buildUserPrompt("https://example.com", "Some page text")
    expect(prompt).toContain("https://example.com")
    expect(prompt).toContain("Some page text")
  })
  it("buildUserPromptPro slices text to 5000", () => {
    const longText = "a".repeat(10000)
    const prompt = buildUserPromptPro("https://example.com", longText)
    expect(prompt.length).toBeLessThan(10500)
  })
})

describe("ship prompts", () => {
  it("system prompt mentions 10 categories", () => {
    expect(CHECK_SYSTEM_PROMPT).toContain("10 categories")
  })
  it("buildCheckPrompt includes URL, text, and headers", () => {
    const prompt = buildCheckPrompt("https://test.com", "page content", "x-frame: deny")
    expect(prompt).toContain("https://test.com")
    expect(prompt).toContain("page content")
    expect(prompt).toContain("x-frame: deny")
  })
})

describe("paywall prompts", () => {
  it("system prompt mentions 10 categories", () => {
    expect(PAYWALL_SYSTEM_PROMPT).toContain("10 categories")
  })
  it("buildPaywallPrompt includes URL", () => {
    const prompt = buildPaywallPrompt("https://app.com/pricing", "pricing info")
    expect(prompt).toContain("https://app.com/pricing")
    expect(prompt).toContain("pricing info")
  })
  it("buildPaywallPromptPro is longer than base prompt", () => {
    const base = buildPaywallPrompt("https://x.com", "text")
    const pro = buildPaywallPromptPro("https://x.com", "text")
    expect(pro.length).toBeGreaterThan(base.length)
  })
})

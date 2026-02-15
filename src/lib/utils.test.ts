import { describe, it, expect } from "vitest"
import { isValidUrl, normalizeUrl, extractDomain, getScoreColor, getGradeColor, getBaseUrl } from "./utils"

describe("isValidUrl", () => {
  it("accepts valid http URLs", () => {
    expect(isValidUrl("http://example.com")).toBe(true)
    expect(isValidUrl("https://example.com")).toBe(true)
    expect(isValidUrl("https://sub.domain.com/path?q=1")).toBe(true)
  })
  it("rejects invalid URLs", () => {
    expect(isValidUrl("not-a-url")).toBe(false)
    expect(isValidUrl("ftp://example.com")).toBe(false)
    expect(isValidUrl("")).toBe(false)
  })
})

describe("normalizeUrl", () => {
  it("adds https:// if missing", () => {
    expect(normalizeUrl("example.com")).toBe("https://example.com")
    expect(normalizeUrl("  example.com  ")).toBe("https://example.com")
  })
  it("preserves existing protocol", () => {
    expect(normalizeUrl("http://example.com")).toBe("http://example.com")
    expect(normalizeUrl("https://example.com")).toBe("https://example.com")
  })
})

describe("extractDomain", () => {
  it("extracts hostname from URL", () => {
    expect(extractDomain("https://www.example.com/path")).toBe("www.example.com")
    expect(extractDomain("http://sub.domain.io")).toBe("sub.domain.io")
  })
  it("returns input for invalid URLs", () => {
    expect(extractDomain("not-a-url")).toBe("not-a-url")
  })
})

describe("getScoreColor", () => {
  it("returns green for high scores", () => {
    expect(getScoreColor(90)).toBe("#22c55e")
    expect(getScoreColor(80)).toBe("#22c55e")
  })
  it("returns yellow for medium scores", () => {
    expect(getScoreColor(70)).toBe("#eab308")
  })
  it("returns orange for below-average scores", () => {
    expect(getScoreColor(50)).toBe("#f97316")
  })
  it("returns red for low scores", () => {
    expect(getScoreColor(30)).toBe("#ef4444")
    expect(getScoreColor(0)).toBe("#ef4444")
  })
})

describe("getGradeColor", () => {
  it("returns correct classes for each grade", () => {
    expect(getGradeColor("A")).toContain("green")
    expect(getGradeColor("B")).toContain("blue")
    expect(getGradeColor("C")).toContain("yellow")
    expect(getGradeColor("D")).toContain("orange")
    expect(getGradeColor("F")).toContain("red")
  })
  it("defaults for unknown grade", () => {
    expect(getGradeColor("X")).toContain("yellow")
  })
})

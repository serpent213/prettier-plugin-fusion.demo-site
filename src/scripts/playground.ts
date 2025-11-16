import prettier from "prettier/standalone"
import * as fusionPlugin from "prettier-plugin-fusion"

document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector<HTMLTextAreaElement>("#input")
  const output = document.querySelector<HTMLTextAreaElement>("#output")
  const errorEl = document.querySelector<HTMLElement>("#error")
  const clearBtn = document.querySelector<HTMLButtonElement>("#clear")
  const overlay = document.querySelector<HTMLElement>("#disabled-overlay")
  const singleQuoteToggle = document.querySelector<HTMLInputElement>("#single-quote")
  const tabWidthInput = document.querySelector<HTMLInputElement>("#tab-width")

  if (input && output && errorEl && clearBtn && overlay && singleQuoteToggle && tabWidthInput) {
    let timer: number | undefined

    const resolveTabWidth = () => {
      const parsed = Number.parseInt(tabWidthInput.value, 10)
      if (Number.isNaN(parsed)) return 2
      return Math.min(Math.max(parsed, 1), 8)
    }

    const setError = (message: string) => {
      errorEl.textContent = message || ""
      overlay.classList.toggle("!opacity-100", Boolean(message))
    }

    const formatNow = async () => {
      try {
        const pretty = await prettier.format(input.value, {
          parser: "fusion",
          plugins: [fusionPlugin],
          tabWidth: resolveTabWidth(),
          singleQuote: singleQuoteToggle.checked,
          printWidth: 118,
          trailingComma: "none"
        })

        output.value = pretty.trimEnd()
        setError("")
      } catch (err: unknown) {
        output.value = ""
        setError(err instanceof Error ? err.message : "Formatter error")
      }
    }

    const scheduleFormat = () => {
      window.clearTimeout(timer)
      timer = window.setTimeout(formatNow, 180)
    }

    input.addEventListener("input", scheduleFormat)
    tabWidthInput.addEventListener("input", scheduleFormat)
    singleQuoteToggle.addEventListener("change", scheduleFormat)
    clearBtn.addEventListener("click", () => {
      input.value = ""
      output.value = ""
      setError("")
      input.focus()
    })

    formatNow()
  }
})

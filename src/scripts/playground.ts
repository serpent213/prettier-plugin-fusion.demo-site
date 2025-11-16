import prettier from "prettier/standalone"
import * as fusionPlugin from "prettier-plugin-fusion"

const input = document.querySelector<HTMLTextAreaElement>("#input")
const output = document.querySelector<HTMLTextAreaElement>("#output")
const errorEl = document.querySelector<HTMLElement>("#error")
const clearBtn = document.querySelector<HTMLButtonElement>("#clear")
const overlay = document.querySelector<HTMLElement>("#disabled-overlay")

if (input && output && errorEl && clearBtn && overlay) {
  let timer: number | undefined

  const setError = (message: string) => {
    errorEl.textContent = message || ""
    overlay.classList.toggle("visible", Boolean(message))
  }

  const formatNow = async () => {
    try {
      const pretty = await prettier.format(input.value, {
        parser: "fusion",
        plugins: [fusionPlugin],
        tabWidth: 2,
        singleQuote: true,
        trailingComma: "none"
      })

      output.value = pretty.trimEnd()
      setError("")
    } catch (err: unknown) {
      console.error(err)
      output.value = ""
      setError(err instanceof Error ? err.message : "Formatter error")
    }
  }

  const scheduleFormat = () => {
    window.clearTimeout(timer)
    timer = window.setTimeout(formatNow, 180)
  }

  input.addEventListener("input", scheduleFormat)
  clearBtn.addEventListener("click", () => {
    input.value = ""
    output.value = ""
    setError("")
    input.focus()
  })

  formatNow()
}

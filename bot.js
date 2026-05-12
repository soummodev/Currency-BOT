import { detectIntent, findCountry } from "./parser.js"
import { currencymap, currencycode } from "./currencies.js"
import { convertCurrency } from "./api.js"

export function createBot() {
  const countryKeys = Object.keys(currencymap)

  function resolveCode(input) {
    const direct = currencymap[input]
    if (direct) return direct.code

    const byCode = currencycode[input.toUpperCase()]
    if (byCode) return byCode.code;

    const partial = findCountry(input, countryKeys)
    return partial ? partial.data.code : null
  }

  async function respond(userInput) {
    const intent = detectIntent(userInput)

    if (intent.type === "WHAT_IS") {
      const found =
        currencymap[intent.country] ||
        findCountry(intent.country, countryKeys)?.data
      if (!found)
        return `❌ Country "${intent.country}" not found in my database.`;
      return `🏳️ The currency of ${intent.country} is **${found.name}** (${found.code}) ${found.symbol}`
    }

    if (intent.type === "CONVERT") {
      const fromCode =
        resolveCode(intent.fromCode.toLowerCase()) || intent.fromCode;
      const toCode = resolveCode(intent.toCountryOrCode);
      if (!toCode)
        return `❌ Could not identify the target currency: "${intent.toCountryOrCode}"`
      try {
        const { result, rate } = await convertCurrency(
          intent.amount,
          fromCode,
          toCode,
        );
        return `💱 ${intent.amount} ${fromCode} = **${result} ${toCode}**\n(Rate: 1 ${fromCode} = ${rate} ${toCode})`
      } catch (err) {
        return `❌ Conversion failed: ${err}`;
      }
    }

    return `🤖 I understand currency questions like:\n• "What is the currency of Japan?"\n• "Convert 500 BDT to USD"`
  }

  return { respond };
}

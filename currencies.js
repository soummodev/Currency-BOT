export const currencymap = {
  bangladesh: { name: "Taka", code: "BDT", symbol: "৳" },
  usa: { name: "US Dollar", code: "USD", symbol: "$" },
  "united states": { name: "US Dollar", code: "USD", symbol: "$" },
  uk: { name: "British Pound", code: "GBP", symbol: "£" },
  "united kingdom": { name: "British Pound", code: "GBP", symbol: "£" },
  india: { name: "Indian Rupee", code: "INR", symbol: "₹" },
  japan: { name: "Japanese Yen", code: "JPY", symbol: "¥" },
  europe: { name: "Euro", code: "EUR", symbol: "€" },
  germany: { name: "Euro", code: "EUR", symbol: "€" },
  france: { name: "Euro", code: "EUR", symbol: "€" },
  china: { name: "Chinese Yuan", code: "CNY", symbol: "¥" },
  canada: { name: "Canadian Dollar", code: "CAD", symbol: "CA$" },
  australia: { name: "Australian Dollar", code: "AUD", symbol: "A$" },
  saudi: { name: "Saudi Riyal", code: "SAR", symbol: "﷼" },
  "saudi arabia": { name: "Saudi Riyal", code: "SAR", symbol: "﷼" },
  uae: { name: "UAE Dirham", code: "AED", symbol: "د.إ" },
  pakistan: { name: "Pakistani Rupee", code: "PKR", symbol: "₨" },
  russia: { name: "Russian Ruble", code: "RUB", symbol: "₽" },
  brazil: { name: "Brazilian Real", code: "BRL", symbol: "R$" },
  singapore: { name: "Singapore Dollar", code: "SGD", symbol: "S$" },
};
export const currencycode = {}
for (const [, val] of Object.entries(currencymap)) {
    currencycode[val.code] = val
}

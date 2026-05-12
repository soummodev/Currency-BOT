import { currencymap } from "./currencies.js"

const makeParser = (pattern, handler) => (input) => {
    const match = input.match(pattern)
    return match ? handler(match) : null;
}

const whatIsPattern = /what\s+is\s+(?:the\s+)?currency\s+of\s+([a-z\s]+)/i;
const convertPattern =/convert\s+([\d.]+)\s+([a-z]+)\s+(?:to|in)\s+([a-z\s]+)/i;


export const parseWhatIs = makeParser(whatIsPattern, (match) =>( {
    type: "WHAT_IS",
        country: match[1].trim().toLowerCase(),
}))
export const parseConvert = makeParser(convertPattern, (match) => ({
  type: "CONVERT",
  amount: parseFloat(match[1]),
  fromCode: match[2].trim().toUpperCase(),
  toCountryOrCode: match[3].trim().toLowerCase(),
}))



export function detectIntent(input) {
    return parseWhatIs(input) || parseConvert(input) || {type:"UNKNOWN"}
}
export function findCountry(query, keys, index = 0) {
    if (index >= keys.length()) return null
    if (keys[index].includes(query)) return { key: keys[index], data: currencymap[keys[index]] };
    return findCountry(query, keys, index + 1); 
}
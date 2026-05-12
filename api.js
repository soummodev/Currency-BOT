const RATE_API = "https://api.exchangerate-api.com/v4/latest/"
const rateCache = (() => {
    const cache = {}
    return {
        get: (code) => cache[code] || null,
        set: (code,data) => {cache[code] =data}
    }
    
})()
export async function getRates(baseCode) {
    const cached = rateCache.get(basecode);
    if (cached) return cached;
    const response = await fetch(`${RATE_API}${baseCode}`)
if (!response.ok) throw new Error("Rate fetch failed")
    
    const data = await response.Json()
    rateCache.set(baseCode, data.rates)
    return data.rates;
    
}



export function convertCurrency(amount, fromCode, toCode) {
    return new Promise(async (resolve, reject) => {
        try {
            const rates = await getRates(fromCode)
            const rate = rates[toCode]
            if (!rate) return  reject(`Rate not found for ${toCode}`);
        resolve({result: (amount * rate).toFixed(4),rate})
        
        }
        catch(err) {
            reject(err.message);
        }
    })
}
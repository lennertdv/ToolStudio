export interface ToolMeta {
  title: string;
  description: string;
  keywords: string;
}

export const toolMetadata: Record<string, ToolMeta> = {
  '/converters/length': {
    title: "Free Length Converter - Convert KM, Miles, Meters, Feet",
    description: "Instantly convert between kilometers, miles, meters, feet, and yards. Free online length converter with no signup required.",
    keywords: "length converter, km to miles, unit conversion",
  },
  '/converters/weight': {
    title: "Free Weight Converter - KG to LBS & More",
    description: "Convert kilograms to pounds, grams to ounces, stones and more. Fast, accurate weight converter online.",
    keywords: "weight converter, kg to lbs, pound converter",
  },
  '/converters/temperature': {
    title: "Temperature Converter - Celsius to Fahrenheit",
    description: "Convert between Celsius, Fahrenheit, and Kelvin instantly. Free online temperature converter.",
    keywords: "temperature converter, celsius to fahrenheit, C to F",
  },
  '/converters/volume': {
    title: "Free Volume Converter - Liters, Gallons, Cups",
    description: "Convert liters to gallons, milliliters to fluid ounces, cups to ml. Fast volume conversion tool.",
    keywords: "volume converter, liter to gallon, ml converter",
  },
  '/converters/currency': {
    title: "Currency Converter - Real-Time Exchange Rates",
    description: "Convert between 100+ currencies with live exchange rates. Free currency converter tool.",
    keywords: "currency converter, exchange rates, USD to EUR",
  },
  '/calculators/bmi': {
    title: "Free BMI Calculator - Calculate Your Body Mass Index",
    description: "Calculate your BMI instantly. Get your body mass index, category (underweight, normal, overweight, obese), and health insights.",
    keywords: "bmi calculator, body mass index, weight calculator",
  },
  '/calculators/calorie': {
    title: "Daily Calorie Needs Calculator - TDEE Calculator",
    description: "Calculate your daily calorie needs based on age, weight, height, gender, and activity level. Free TDEE calculator.",
    keywords: "calorie calculator, TDEE calculator, daily calorie needs",
  },
  '/calculators/age': {
    title: "Age Calculator - How Old Am I?",
    description: "Calculate your exact age in years, months, days. Find out how many days you've lived and when your next birthday is.",
    keywords: "age calculator, how old am i, birthday calculator",
  },
  '/calculators/tip': {
    title: "Tip Calculator - Calculate Restaurant Tips Instantly",
    description: "Calculate tip amounts and split bills between friends. Fast, easy tip calculator with customizable percentages.",
    keywords: "tip calculator, bill splitter, restaurant tip",
  },
  '/calculators/mortgage': {
    title: "Mortgage Calculator - Estimate Monthly Payments",
    description: "Calculate monthly mortgage payments based on loan amount, interest rate, and term. See total interest paid.",
    keywords: "mortgage calculator, loan payment calculator, home loan",
  },
  '/crypto/converter': {
    title: "Cryptocurrency Converter - Bitcoin, Ethereum Price",
    description: "Convert Bitcoin, Ethereum, Litecoin and 100+ cryptos to USD, EUR, GBP with live prices.",
    keywords: "crypto converter, bitcoin to usd, ethereum price",
  },
  '/crypto/mining': {
    title: "Crypto Mining Calculator - Profitability Calculator",
    description: "Calculate cryptocurrency mining profitability. See daily/monthly earnings based on hashrate and electricity costs.",
    keywords: "mining calculator, crypto profitability, bitcoin mining",
  },
  '/crypto/fee': {
    title: "Crypto Fee Calculator - Transaction Cost Calculator",
    description: "Calculate cryptocurrency transaction fees. See how much you'll pay and receive after fees.",
    keywords: "crypto fees, transaction calculator, exchange fees",
  },
  '/text/word-counter': {
    title: "Free Word Counter - Count Words, Characters, Sentences",
    description: "Count words, characters, sentences, and paragraphs instantly. Free online word counter tool for writers.",
    keywords: "word counter, character counter, word count",
  },
  '/text/character-counter': {
    title: "Character Counter - Counting Tool Online",
    description: "Count total characters, letters, numbers, and spaces. Essential tool for Twitter, SMS, and more.",
    keywords: "character counter, letter counter, character limit",
  },
  '/text/json-formatter': {
    title: "JSON Formatter - Validate & Format JSON Online",
    description: "Format, validate, and beautify JSON code. Check for syntax errors in your JSON data.",
    keywords: "json formatter, json validator, json beautifier",
  },
  '/text/markdown': {
    title: "Markdown to HTML Converter - Convert Instantly",
    description: "Convert Markdown syntax to HTML code instantly. Free online markdown converter.",
    keywords: "markdown to html, markdown converter, html converter",
  },
  '/generators/password': {
    title: "Strong Password Generator - Secure Passwords Online",
    description: "Generate strong, random passwords with customizable length and character types. Free online password generator.",
    keywords: "password generator, strong password, random password",
  },
  '/generators/uuid': {
    title: "UUID Generator - Generate Unique IDs Online",
    description: "Generate v1 and v4 UUIDs instantly. Free online UUID generator for developers.",
    keywords: "uuid generator, guid generator, unique id",
  },
  '/generators/color-palette': {
    title: "Color Palette Generator - Create Color Schemes",
    description: "Generate beautiful color palettes with complementary, analogous, and triadic schemes. Free color generator.",
    keywords: "color palette generator, color scheme, color wheel",
  },
  '/generators/name-generator': {
    title: "Random Name Generator - Generate Names Instantly",
    description: "Generate random male, female, or neutral names from different nationalities. Free online name generator.",
    keywords: "name generator, random name, name ideas",
  },
};

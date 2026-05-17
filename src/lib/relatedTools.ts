export interface RelatedTool {
  name: string;
  path: string;
  description: string;
}

export const relatedTools: Record<string, RelatedTool[]> = {
  '/converters/length': [
    { name: 'Weight Converter', path: '/converters/weight', description: 'Convert kilograms to pounds and more' },
    { name: 'Temperature Converter', path: '/converters/temperature', description: 'Convert Celsius to Fahrenheit' },
    { name: 'Volume Converter', path: '/converters/volume', description: 'Convert liters to gallons' }
  ],
  '/converters/weight': [
    { name: 'Length Converter', path: '/converters/length', description: 'Convert kilometers to miles' },
    { name: 'BMI Calculator', path: '/calculators/bmi', description: 'Calculate your body mass index' },
    { name: 'Calorie Calculator', path: '/calculators/calorie', description: 'Calculate daily calorie needs' }
  ],
  '/converters/temperature': [
    { name: 'Length Converter', path: '/converters/length', description: 'Convert different units' },
    { name: 'Volume Converter', path: '/converters/volume', description: 'Convert liters, gallons, cups' },
    { name: 'Weight Converter', path: '/converters/weight', description: 'Convert kg to lbs' }
  ],
  '/converters/volume': [
    { name: 'Length Converter', path: '/converters/length', description: 'Convert kilometers to miles' },
    { name: 'Weight Converter', path: '/converters/weight', description: 'Convert kilograms to pounds' },
    { name: 'Temperature Converter', path: '/converters/temperature', description: 'Convert Celsius to Fahrenheit' }
  ],
  '/converters/currency': [
    { name: 'Crypto Converter', path: '/crypto/converter', description: 'Convert cryptocurrencies' },
    { name: 'Length Converter', path: '/converters/length', description: 'Convert different units' },
    { name: 'Weight Converter', path: '/converters/weight', description: 'Convert kilograms to pounds' }
  ],
  '/calculators/bmi': [
    { name: 'Calorie Calculator', path: '/calculators/calorie', description: 'Calculate daily calorie needs' },
    { name: 'Weight Converter', path: '/converters/weight', description: 'Convert different weight units' },
    { name: 'Age Calculator', path: '/calculators/age', description: 'Calculate your exact age' }
  ],
  '/calculators/calorie': [
    { name: 'BMI Calculator', path: '/calculators/bmi', description: 'Calculate body mass index' },
    { name: 'Age Calculator', path: '/calculators/age', description: 'Calculate your exact age' },
    { name: 'Tip Calculator', path: '/calculators/tip', description: 'Calculate tips and split bills' }
  ],
  '/calculators/age': [
    { name: 'BMI Calculator', path: '/calculators/bmi', description: 'Calculate body mass index' },
    { name: 'Calorie Calculator', path: '/calculators/calorie', description: 'Calculate daily needs' },
    { name: 'Tip Calculator', path: '/calculators/tip', description: 'Calculate restaurant tips' }
  ],
  '/calculators/tip': [
    { name: 'Mortgage Calculator', path: '/calculators/mortgage', description: 'Calculate mortgage payments' },
    { name: 'Age Calculator', path: '/calculators/age', description: 'Calculate your age' },
    { name: 'Calorie Calculator', path: '/calculators/calorie', description: 'Calculate calorie needs' }
  ],
  '/calculators/mortgage': [
    { name: 'Tip Calculator', path: '/calculators/tip', description: 'Calculate tips' },
    { name: 'BMI Calculator', path: '/calculators/bmi', description: 'Calculate BMI' },
    { name: 'Calorie Calculator', path: '/calculators/calorie', description: 'Calculate calorie needs' }
  ],
  '/crypto/converter': [
    { name: 'Crypto Mining Calculator', path: '/crypto/mining', description: 'Calculate mining profitability' },
    { name: 'Crypto Fee Calculator', path: '/crypto/fee', description: 'Calculate transaction fees' },
    { name: 'Currency Converter', path: '/converters/currency', description: 'Convert between currencies' }
  ],
  '/crypto/mining': [
    { name: 'Crypto Converter', path: '/crypto/converter', description: 'Convert cryptocurrencies' },
    { name: 'Crypto Fee Calculator', path: '/crypto/fee', description: 'Calculate crypto fees' },
    { name: 'Currency Converter', path: '/converters/currency', description: 'Convert currencies' }
  ],
  '/crypto/fee': [
    { name: 'Crypto Converter', path: '/crypto/converter', description: 'Convert cryptocurrencies' },
    { name: 'Crypto Mining Calculator', path: '/crypto/mining', description: 'Calculate mining profit' },
    { name: 'Currency Converter', path: '/converters/currency', description: 'Convert currencies' }
  ],
  '/text/word-counter': [
    { name: 'Character Counter', path: '/text/character-counter', description: 'Count characters and letters' },
    { name: 'JSON Formatter', path: '/text/json-formatter', description: 'Format and validate JSON' },
    { name: 'Markdown to HTML', path: '/text/markdown', description: 'Convert Markdown to HTML' }
  ],
  '/text/character-counter': [
    { name: 'Word Counter', path: '/text/word-counter', description: 'Count words in text' },
    { name: 'JSON Formatter', path: '/text/json-formatter', description: 'Format JSON code' },
    { name: 'Markdown to HTML', path: '/text/markdown', description: 'Convert Markdown to HTML' }
  ],
  '/text/json-formatter': [
    { name: 'Word Counter', path: '/text/word-counter', description: 'Count words' },
    { name: 'Character Counter', path: '/text/character-counter', description: 'Count characters' },
    { name: 'Markdown to HTML', path: '/text/markdown', description: 'Convert Markdown' }
  ],
  '/text/markdown': [
    { name: 'Word Counter', path: '/text/word-counter', description: 'Count words' },
    { name: 'JSON Formatter', path: '/text/json-formatter', description: 'Format JSON' },
    { name: 'Character Counter', path: '/text/character-counter', description: 'Count characters' }
  ],
  '/generators/password': [
    { name: 'UUID Generator', path: '/generators/uuid', description: 'Generate unique IDs' },
    { name: 'Name Generator', path: '/generators/name-generator', description: 'Generate random names' },
    { name: 'Color Palette Generator', path: '/generators/color-palette', description: 'Generate color schemes' }
  ],
  '/generators/uuid': [
    { name: 'Password Generator', path: '/generators/password', description: 'Generate secure passwords' },
    { name: 'Name Generator', path: '/generators/name-generator', description: 'Generate names' },
    { name: 'Color Palette Generator', path: '/generators/color-palette', description: 'Generate colors' }
  ],
  '/generators/color-palette': [
    { name: 'Password Generator', path: '/generators/password', description: 'Generate passwords' },
    { name: 'UUID Generator', path: '/generators/uuid', description: 'Generate UUIDs' },
    { name: 'Name Generator', path: '/generators/name-generator', description: 'Generate names' }
  ],
  '/generators/name-generator': [
    { name: 'Password Generator', path: '/generators/password', description: 'Generate passwords' },
    { name: 'UUID Generator', path: '/generators/uuid', description: 'Generate UUIDs' },
    { name: 'Color Palette Generator', path: '/generators/color-palette', description: 'Generate colors' }
  ]
};

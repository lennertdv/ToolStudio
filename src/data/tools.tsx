import React from 'react';
import { 
  Ruler, Scale, Thermometer, Droplets, Banknote, 
  User, Flame, Calendar, Coins, Landmark, 
  Bitcoin, Pickaxe, Receipt, Type, Binary, 
  Braces, FileJson, Key, Fingerprint, Palette, 
  Users, Luggage, TrendingUp
} from 'lucide-react';
import { generatePackingList } from './packingItems';
import { PackingListResult } from '../components/tools/PackingListResult';
import { SalaryResult } from '../components/tools/SalaryResult';

export interface ToolInput {
  id: string;
  label: string;
  type: 'number' | 'text' | 'select' | 'date' | 'checkbox' | 'textarea' | 'color';
  options?: { value: string; label: string }[];
  defaultValue?: any;
  placeholder?: string;
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: any;
  inputs: ToolInput[];
  calculate: (values: Record<string, any>) => string | string[] | any;
  isPopular?: boolean;
  isNew?: boolean;
  renderResult?: (result: any) => React.ReactNode;
}

export interface Category {
  id: string;
  name: string;
  tools: Tool[];
}

export const CATEGORIES: Category[] = [
  {
    id: 'converters',
    name: 'Converters',
    tools: [
      {
        id: 'length',
        name: 'Length Converter',
        description: 'Convert between different units of length like km, m, miles, feet, and yards.',
        icon: Ruler,
        inputs: [
          { id: 'value', label: 'Value', type: 'number', defaultValue: 1 },
          { id: 'from', label: 'From', type: 'select', options: [
            { value: 'km', label: 'Kilometers' },
            { value: 'm', label: 'Meters' },
            { value: 'mi', label: 'Miles' },
            { value: 'ft', label: 'Feet' },
            { value: 'yd', label: 'Yards' },
          ], defaultValue: 'km' },
          { id: 'to', label: 'To', type: 'select', options: [
            { value: 'km', label: 'Kilometers' },
            { value: 'm', label: 'Meters' },
            { value: 'mi', label: 'Miles' },
            { value: 'ft', label: 'Feet' },
            { value: 'yd', label: 'Yards' },
          ], defaultValue: 'mi' },
        ],
        calculate: (v) => {
          const factors: Record<string, number> = { m: 1, km: 1000, mi: 1609.34, ft: 0.3048, yd: 0.9144 };
          const result = (v.value * factors[v.from]) / factors[v.to];
          return `${v.value} ${v.from} = ${result.toFixed(4)} ${v.to}`;
        },
        isPopular: true
      },
      {
        id: 'weight',
        name: 'Weight Converter',
        description: 'Convert between kg, lbs, g, oz, and stone.',
        icon: Scale,
        inputs: [
          { id: 'value', label: 'Value', type: 'number', defaultValue: 1 },
          { id: 'from', label: 'From', type: 'select', options: [
            { value: 'kg', label: 'Kilograms' },
            { value: 'lb', label: 'Pounds' },
            { value: 'g', label: 'Grams' },
            { value: 'oz', label: 'Ounces' },
            { value: 'st', label: 'Stone' },
          ], defaultValue: 'kg' },
          { id: 'to', label: 'To', type: 'select', options: [
            { value: 'kg', label: 'Kilograms' },
            { value: 'lb', label: 'Pounds' },
            { value: 'g', label: 'Grams' },
            { value: 'oz', label: 'Ounces' },
            { value: 'st', label: 'Stone' },
          ], defaultValue: 'lb' },
        ],
        calculate: (v) => {
          const toKg: Record<string, number> = { kg: 1, lb: 0.453592, g: 0.001, oz: 0.0283495, st: 6.35029 };
          const result = (v.value * toKg[v.from]) / toKg[v.to];
          return `${v.value} ${v.from} = ${result.toFixed(4)} ${v.to}`;
        },
        isNew: true
      },
      {
        id: 'temperature',
        name: 'Temperature Converter',
        description: 'Convert between Celsius, Fahrenheit, and Kelvin.',
        icon: Thermometer,
        inputs: [
          { id: 'value', label: 'Value', type: 'number', defaultValue: 25 },
          { id: 'from', label: 'From', type: 'select', options: [
            { value: 'C', label: 'Celsius (°C)' },
            { value: 'F', label: 'Fahrenheit (°F)' },
            { value: 'K', label: 'Kelvin (K)' },
          ], defaultValue: 'C' },
          { id: 'to', label: 'To', type: 'select', options: [
            { value: 'C', label: 'Celsius (°C)' },
            { value: 'F', label: 'Fahrenheit (°F)' },
            { value: 'K', label: 'Kelvin (K)' },
          ], defaultValue: 'F' },
        ],
        calculate: (v) => {
          let celsius = v.value;
          if (v.from === 'F') celsius = (v.value - 32) * 5/9;
          if (v.from === 'K') celsius = v.value - 273.15;

          let result = celsius;
          if (v.to === 'F') result = (celsius * 9/5) + 32;
          if (v.to === 'K') result = celsius + 273.15;

          return `${v.value} °${v.from} = ${result.toFixed(2)} °${v.to}`;
        }
      },
      {
        id: 'volume',
        name: 'Volume Converter',
        description: 'Convert between liters, ml, gallons, quarts, cups, and tbsp.',
        icon: Droplets,
        inputs: [
          { id: 'value', label: 'Value', type: 'number', defaultValue: 1 },
          { id: 'from', label: 'From', type: 'select', options: [
            { value: 'l', label: 'Liters' },
            { value: 'ml', label: 'Milliliters' },
            { value: 'gal', label: 'Gallons' },
            { value: 'qt', label: 'Quarts' },
            { value: 'cup', label: 'Cups' },
            { value: 'tbsp', label: 'Tablespoons' },
          ], defaultValue: 'l' },
          { id: 'to', label: 'To', type: 'select', options: [
            { value: 'l', label: 'Liters' },
            { value: 'ml', label: 'Milliliters' },
            { value: 'gal', label: 'Gallons' },
            { value: 'qt', label: 'Quarts' },
            { value: 'cup', label: 'Cups' },
            { value: 'tbsp', label: 'Tablespoons' },
          ], defaultValue: 'gal' },
        ],
        calculate: (v) => {
          const factors: Record<string, number> = { l: 1000, ml: 1, gal: 3785.41, qt: 946.353, cup: 236.588, tbsp: 14.7868 };
          const result = (v.value * factors[v.from]) / factors[v.to];
          return `${v.value} ${v.from} = ${result.toFixed(4)} ${v.to}`;
        }
      },
      {
        id: 'currency',
        name: 'Currency Converter',
        description: 'Approximate conversion between major world currencies.',
        icon: Banknote,
        inputs: [
          { id: 'value', label: 'Value', type: 'number', defaultValue: 100 },
          { id: 'from', label: 'From', type: 'select', options: [
            { value: 'USD', label: 'USD - Dollar' },
            { value: 'EUR', label: 'EUR - Euro' },
            { value: 'GBP', label: 'GBP - Pound' },
            { value: 'JPY', label: 'JPY - Yen' },
            { value: 'CHF', label: 'CHF - Franc' },
          ], defaultValue: 'USD' },
          { id: 'to', label: 'To', type: 'select', options: [
            { value: 'USD', label: 'USD - Dollar' },
            { value: 'EUR', label: 'EUR - Euro' },
            { value: 'GBP', label: 'GBP - Pound' },
            { value: 'JPY', label: 'JPY - Yen' },
            { value: 'CHF', label: 'CHF - Franc' },
          ], defaultValue: 'EUR' },
        ],
        calculate: (v) => {
          const rates: Record<string, number> = { USD: 1, EUR: 0.92, GBP: 0.79, JPY: 150.5, CHF: 0.88 };
          const result = (v.value / rates[v.from]) * rates[v.to];
          return `${v.value} ${v.from} = ${result.toFixed(2)} ${v.to}\n\nNote: Exchange rates are approximate and for informational purposes.`;
        }
      }
    ]
  },
  {
    id: 'calculators',
    name: 'Calculators',
    tools: [
      {
        id: 'bmi',
        name: 'BMI Calculator',
        description: 'Calculate your Body Mass Index (BMI).',
        icon: User,
        inputs: [
          { id: 'weight', label: 'Weight (kg)', type: 'number', defaultValue: 70 },
          { id: 'height', label: 'Height (cm)', type: 'number', defaultValue: 175 },
        ],
        calculate: (v) => {
          if (v.weight <= 0 || v.height <= 0) return 'Please enter valid positive values.';
          const bmi = v.weight / Math.pow(v.height / 100, 2);
          let cat = '';
          if (bmi < 18.5) cat = 'Underweight';
          else if (bmi < 25) cat = 'Normal weight';
          else if (bmi < 30) cat = 'Overweight';
          else cat = 'Obese';
          return `Your BMI is ${bmi.toFixed(1)} (${cat})`;
        },
        isPopular: true
      },
      {
        id: 'calorie',
        name: 'Calorie Calculator',
        description: 'Estimate your daily calorie needs.',
        icon: Flame,
        inputs: [
          { id: 'weight', label: 'Weight (kg)', type: 'number', defaultValue: 70 },
          { id: 'height', label: 'Height (cm)', type: 'number', defaultValue: 175 },
          { id: 'age', label: 'Age (years)', type: 'number', defaultValue: 25 },
          { id: 'gender', label: 'Gender', type: 'select', options: [
            { value: 'm', label: 'Male' },
            { value: 'f', label: 'Female' },
          ], defaultValue: 'm' },
          { id: 'activity', label: 'Activity Level', type: 'select', options: [
            { value: '1.2', label: 'Sedentary' },
            { value: '1.375', label: 'Light' },
            { value: '1.55', label: 'Moderate' },
            { value: '1.725', label: 'Active' },
            { value: '1.9', label: 'Very Active' },
          ], defaultValue: '1.2' },
        ],
        calculate: (v) => {
          let bmr = (10 * v.weight) + (6.25 * v.height) - (5 * v.age);
          bmr += v.gender === 'm' ? 5 : -161;
          const calories = bmr * parseFloat(v.activity);
          return `Your approximate daily calorie needs: ${Math.round(calories).toLocaleString()} kcal`;
        }
      },
      {
        id: 'age',
        name: 'Age Calculator',
        description: 'Calculate your exact age in years, months, and days.',
        icon: Calendar,
        inputs: [
          { id: 'birthdate', label: 'Birth Date', type: 'date', defaultValue: '1995-01-01' },
        ],
        calculate: (v) => {
          const birth = new Date(v.birthdate);
          const today = new Date();
          let years = today.getFullYear() - birth.getFullYear();
          let months = today.getMonth() - birth.getMonth();
          let days = today.getDate() - birth.getDate();

          if (days < 0) {
            months -= 1;
            days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
          }
          if (months < 0) {
            years -= 1;
            months += 12;
          }

          const msInDay = 24 * 60 * 60 * 1000;
          const totalDays = Math.floor((today.getTime() - birth.getTime()) / msInDay);

          return `You are ${years} years, ${months} months, and ${days} days old.\nTotal days lived: ${totalDays.toLocaleString()}`;
        }
      },
      {
        id: 'tip',
        name: 'Tip Calculator',
        description: 'Calculate tip and split the bill among friends.',
        icon: Coins,
        inputs: [
          { id: 'bill', label: 'Bill Amount ($)', type: 'number', defaultValue: 50 },
          { id: 'tip', label: 'Tip Percentage (%)', type: 'number', defaultValue: 15 },
          { id: 'people', label: 'Number of People', type: 'number', defaultValue: 1 },
        ],
        calculate: (v) => {
          const tipAmount = v.bill * (v.tip / 100);
          const total = v.bill + tipAmount;
          const perPerson = total / v.people;
          return `Tip Amount: $${tipAmount.toFixed(2)}\nTotal Bill: $${total.toFixed(2)}\nPer Person: $${perPerson.toFixed(2)}`;
        }
      },
      {
        id: 'mortgage',
        name: 'Mortgage Calculator',
        description: 'Calculate your monthly mortgage payments.',
        icon: Landmark,
        inputs: [
          { id: 'loan', label: 'Loan Amount ($)', type: 'number', defaultValue: 200000 },
          { id: 'rate', label: 'Interest Rate (%)', type: 'number', defaultValue: 5 },
          { id: 'years', label: 'Loan Term (years)', type: 'number', defaultValue: 30 },
        ],
        calculate: (v) => {
          const r = (v.rate / 100) / 12;
          const n = v.years * 12;
          const payment = (v.loan * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
          const totalPayment = payment * n;
          const totalInterest = totalPayment - v.loan;
          return `Monthly Payment: $${payment.toFixed(2)}\nTotal Interest: $${totalInterest.toFixed(2)}\nTotal Amount Paid: $${totalPayment.toFixed(2)}`;
        }
      }
    ]
  },
  {
    id: 'financial',
    name: 'Financial',
    tools: [
      {
        id: 'salary-calculator',
        name: 'Salary Calculator',
        description: 'Calculate your take-home pay after taxes and compare it with national averages.',
        icon: Landmark,
        inputs: [
          { id: 'gross', label: 'Gross Annual Salary ($)', type: 'number', defaultValue: 50000 },
          { id: 'country', label: 'Country', type: 'select', options: [
            { value: 'USA', label: 'United States' },
            { value: 'UK', label: 'United Kingdom' },
            { value: 'Germany', label: 'Germany' },
            { value: 'Belgium', label: 'Belgium' },
            { value: 'Netherlands', label: 'Netherlands' },
          ], defaultValue: 'USA' },
          { id: 'taxRate', label: 'Approx. Tax Rate (%)', type: 'number', defaultValue: 25 },
          { id: 'benefits', label: 'Monthly Benefits ($)', type: 'number', defaultValue: 0 }
        ],
        calculate: (v) => {
          const annualGross = v.gross;
          const rate = v.taxRate / 100;
          const annualTax = annualGross * rate;
          const annualNet = (annualGross - annualTax) + (v.benefits * 12);
          
          const medians: Record<string, number> = {
            'USA': 56000,
            'UK': 35000,
            'Germany': 48000,
            'Belgium': 45000,
            'Netherlands': 42000
          };

          return {
            gross: annualGross,
            net: annualNet,
            tax: annualTax,
            taxRate: (annualTax / annualGross) * 100,
            breakdown: [
              { name: 'Income Tax', value: annualTax * 0.7, color: '#ef4444' },
              { name: 'Social Security', value: annualTax * 0.2, color: '#f59e0b' },
              { name: 'Misc Deductions', value: annualTax * 0.1, color: '#10b981' }
            ],
            averages: {
              ratio: annualGross / (medians[v.country] || 40000),
              country: v.country
            }
          };
        },
        renderResult: (data) => <SalaryResult data={data} />,
        isPopular: true,
        isNew: true
      },
      {
        id: 'compound-interest',
        name: 'Compound Interest',
        description: 'Calculate how your money grows over time with interest and regular contributions.',
        icon: TrendingUp,
        inputs: [
          { id: 'principal', label: 'Initial Investment ($)', type: 'number', defaultValue: 1000 },
          { id: 'rate', label: 'Annual Interest Rate (%)', type: 'number', defaultValue: 7 },
          { id: 'years', label: 'Time Period (Years)', type: 'number', defaultValue: 10 },
          { id: 'contribution', label: 'Monthly Contribution ($)', type: 'number', defaultValue: 100 }
        ],
        calculate: (v) => {
          const p = v.principal;
          const r = v.rate / 100 / 12;
          const n = v.years * 12;
          const c = v.contribution;
          
          const futureValue = p * Math.pow(1 + r, n) + c * ((Math.pow(1 + r, n) - 1) / r);
          return `Total Value: $${futureValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
        }
      }
    ]
  },
  {
    id: 'crypto',
    name: 'Crypto',
    tools: [
      {
        id: 'converter',
        name: 'Crypto Converter',
        description: 'Convert between popular cryptocurrencies and fiat.',
        icon: Bitcoin,
        inputs: [
          { id: 'amount', label: 'Amount', type: 'number', defaultValue: 1 },
          { id: 'crypto', label: 'Crypto', type: 'select', options: [
            { value: 'BTC', label: 'Bitcoin' },
            { value: 'ETH', label: 'Ethereum' },
            { value: 'LTC', label: 'Litecoin' },
            { value: 'XRP', label: 'Ripple' },
          ], defaultValue: 'BTC' },
          { id: 'fiat', label: 'Fiat', type: 'select', options: [
            { value: 'USD', label: 'USD' },
            { value: 'EUR', label: 'EUR' },
            { value: 'GBP', label: 'GBP' },
          ], defaultValue: 'USD' },
        ],
        calculate: (v) => {
          const cryptoInUsd: Record<string, number> = { BTC: 42000, ETH: 2200, LTC: 90, XRP: 0.5 };
          const fiatInUsd: Record<string, number> = { USD: 1, EUR: 0.92, GBP: 0.79 };
          const result = (v.amount * cryptoInUsd[v.crypto]) / fiatInUsd[v.fiat];
          return `${v.amount} ${v.crypto} = ${result.toLocaleString(undefined, { minimumFractionDigits: 2 })} ${v.fiat}`;
        }
      },
      {
        id: 'mining',
        name: 'Mining Calculator',
        description: 'Estimate mining profitability (simplified).',
        icon: Pickaxe,
        inputs: [
          { id: 'hashrate', label: 'Hashrate', type: 'number', defaultValue: 100 },
          { id: 'unit', label: 'Unit', type: 'select', options: [
            { value: 'TH', label: 'TH/s' },
            { value: 'GH', label: 'GH/s' },
          ], defaultValue: 'TH' },
          { id: 'power', label: 'Power (Watts)', type: 'number', defaultValue: 3000 },
          { id: 'cost', label: 'Electricity Cost ($/kWh)', type: 'number', defaultValue: 0.12 },
        ],
        calculate: (v) => {
          const dailyRewardBase = v.hashrate * (v.unit === 'TH' ? 0.0005 : 0.0000005);
          const dailyPowerCost = (v.power / 1000) * 24 * v.cost;
          const profit = (dailyRewardBase * 42000) - dailyPowerCost; // Assuming BTC price
          return `Estimated Daily Reward: $${(dailyRewardBase * 42000).toFixed(2)}\nDaily Electricity Cost: $${dailyPowerCost.toFixed(2)}\nDaily Net Profit: $${profit.toFixed(2)}`;
        }
      },
      {
        id: 'fee',
        name: 'Fee Calculator',
        description: 'Calculate transaction fees for crypto transfers.',
        icon: Receipt,
        inputs: [
          { id: 'amount', label: 'Transaction Amount ($)', type: 'number', defaultValue: 1000 },
          { id: 'feeRate', label: 'Fee Percentage (%)', type: 'number', defaultValue: 0.5 },
        ],
        calculate: (v) => {
          const fee = v.amount * (v.feeRate / 100);
          const total = v.amount - fee;
          return `Fee Amount: $${fee.toFixed(2)}\nNet Amount to Receive: $${total.toFixed(2)}`;
        }
      }
    ]
  },
  {
    id: 'text',
    name: 'Text Tools',
    tools: [
      {
        id: 'word-counter',
        name: 'Word Counter',
        description: 'Count words, characters, sentences, and paragraphs.',
        icon: Type,
        inputs: [
          { id: 'text', label: 'Input Text', type: 'textarea', defaultValue: '', placeholder: 'Paste your text here...' },
        ],
        calculate: (v) => {
          const text = v.text.trim();
          if (!text) return 'Please enter some text.';
          const words = text.split(/\s+/).filter((x: string) => x.length > 0).length;
          const chars = v.text.length;
          const sentences = text.split(/[.!?]+/).filter((x: string) => x.length > 0).length;
          const paragraphs = text.split(/\n\s*\n/).filter((x: string) => x.length > 0).length;
          return `Words: ${words}\nCharacters: ${chars}\nSentences: ${sentences}\nParagraphs: ${paragraphs}`;
        }
      },
      {
        id: 'character-counter',
        name: 'Character Counter',
        description: 'Advanced character analysis for your text.',
        icon: Binary,
        inputs: [
          { id: 'text', label: 'Input Text', type: 'textarea', defaultValue: '', placeholder: 'Paste your text here...' },
        ],
        calculate: (v) => {
          const text = v.text;
          const total = text.length;
          const noSpaces = text.replace(/\s/g, '').length;
          const letters = text.replace(/[^a-zA-Z]/g, '').length;
          const numbers = text.replace(/[^0-9]/g, '').length;
          const spaces = text.split(' ').length - 1;
          return `Total Characters: ${total}\nWithout Spaces: ${noSpaces}\nLetters: ${letters}\nNumbers: ${numbers}\nSpaces: ${spaces}`;
        }
      },
      {
        id: 'json-formatter',
        name: 'JSON Formatter',
        description: 'Prettify and validate your JSON data.',
        icon: Braces,
        inputs: [
          { id: 'text', label: 'JSON Input', type: 'textarea', defaultValue: '{"key":"value","array":[1,2,3]}', placeholder: 'Paste JSON here...' },
        ],
        calculate: (v) => {
          try {
            const obj = JSON.parse(v.text);
            return JSON.stringify(obj, null, 2);
          } catch (e: any) {
            return `Invalid JSON: ${e.message}`;
          }
        }
      },
      {
        id: 'markdown',
        name: 'Markdown to HTML',
        description: 'Convert basic Markdown to HTML code.',
        icon: FileJson,
        inputs: [
          { id: 'text', label: 'Markdown', type: 'textarea', defaultValue: '# Hello World\n\n**Bold text**', placeholder: 'Paste markdown here...' },
        ],
        calculate: (v) => {
          let html = v.text
            .replace(/^# (.*$)/gim, '<h1>$1</h1>')
            .replace(/^## (.*$)/gim, '<h2>$1</h2>')
            .replace(/^### (.*$)/gim, '<h3>$1</h3>')
            .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
            .replace(/\*(.*)\*/gim, '<em>$1</em>')
            .replace(/\n$/gim, '<br />');
          return html;
        }
      }
    ]
  },
  {
    id: 'generators',
    name: 'Generators',
    tools: [
      {
        id: 'password',
        name: 'Password Generator',
        description: 'Create secure and random passwords.',
        icon: Key,
        inputs: [
          { id: 'length', label: 'Length', type: 'number', defaultValue: 16 },
          { id: 'upper', label: 'Uppercase', type: 'checkbox', defaultValue: true },
          { id: 'lower', label: 'Lowercase', type: 'checkbox', defaultValue: true },
          { id: 'numbers', label: 'Numbers', type: 'checkbox', defaultValue: true },
          { id: 'symbols', label: 'Symbols', type: 'checkbox', defaultValue: true },
        ],
        calculate: (v) => {
          let charset = '';
          if (v.upper) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
          if (v.lower) charset += 'abcdefghijklmnopqrstuvwxyz';
          if (v.numbers) charset += '0123456789';
          if (v.symbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
          
          if (!charset) return 'Please select at least one option.';
          
          let password = '';
          for (let i = 0; i < v.length; i++) {
            password += charset.charAt(Math.floor(Math.random() * charset.length));
          }
          return password;
        },
        isPopular: true
      },
      {
        id: 'uuid',
        name: 'UUID Generator',
        description: 'Generate unique identifiers (v4).',
        icon: Fingerprint,
        inputs: [
          { id: 'count', label: 'Number of UUIDs', type: 'number', defaultValue: 1 },
        ],
        calculate: (v) => {
          const uuids = [];
          for (let i = 0; i < v.count; i++) {
            uuids.push('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
              const r = Math.random() * 16 | 0;
              const v = c === 'x' ? r : (r & 0x3 | 0x8);
              return v.toString(16);
            }));
          }
          return uuids.join('\n');
        },
        isNew: true
      },
      {
        id: 'color-palette',
        name: 'Palette Generator',
        description: 'Generate sets of colors.',
        icon: Palette,
        inputs: [
          { id: 'type', label: 'Type', type: 'select', options: [
            { value: 'random', label: 'Random' },
            { value: 'warm', label: 'Warm' },
            { value: 'cool', label: 'Cool' },
          ], defaultValue: 'random' },
        ],
        calculate: (v) => {
          const colors = [];
          for (let i = 0; i < 5; i++) {
            let r, g, b;
            if (v.type === 'warm') {
              r = 200 + Math.random() * 55;
              g = 100 + Math.random() * 100;
              b = Math.random() * 100;
            } else if (v.type === 'cool') {
              r = Math.random() * 100;
              g = 100 + Math.random() * 100;
              b = 200 + Math.random() * 55;
            } else {
              r = Math.random() * 255;
              g = Math.random() * 255;
              b = Math.random() * 255;
            }
            colors.push(`#${Math.round(r).toString(16).padStart(2, '0')}${Math.round(g).toString(16).padStart(2, '0')}${Math.round(b).toString(16).padStart(2, '0')}`);
          }
          return colors.join('\n');
        }
      },
      {
        id: 'name-generator',
        name: 'Name Generator',
        description: 'Generate random names (Fantasy themed).',
        icon: Users,
        inputs: [
          { id: 'count', label: 'Count', type: 'number', defaultValue: 5 },
        ],
        calculate: (v) => {
          const firsts = ['Aragorn', 'Legolas', 'Gimli', 'Frodo', 'Samwise', 'Gandalf', 'Galadriel', 'Arwen'];
          const lasts = ['Stormborn', 'Ironfoot', 'Greenleaf', 'Oakenshield', 'Underhill', 'The Grey', 'of the Valley'];
          const names = [];
          for (let i = 0; i < v.count; i++) {
            names.push(`${firsts[Math.floor(Math.random() * firsts.length)]} ${lasts[Math.floor(Math.random() * lasts.length)]}`);
          }
          return names.join('\n');
        }
      }
    ]
  },
  {
    id: 'travel',
    name: 'Travel',
    tools: [
      {
        id: 'packing-list',
        name: 'Packing List Generator',
        description: 'Generate a smart, visual packing list based on your destination, duration, and activities.',
        icon: Luggage,
        inputs: [
          { id: 'destination', label: 'Destination', type: 'text', defaultValue: 'Paris, France', placeholder: 'Where are you going?' },
          { id: 'duration', label: 'Trip Duration (days)', type: 'number', defaultValue: 3 },
          { id: 'weather', label: 'Expected Weather', type: 'select', options: [
            { value: 'hot', label: 'Hot / Summer' },
            { value: 'cold', label: 'Cold / Winter' },
            { value: 'moderate', label: 'Moderate / Spring/Fall' },
          ], defaultValue: 'moderate' },
          { id: 'activities', label: 'Main Activities', type: 'select', options: [
            { value: 'beach', label: 'Beach & Sun' },
            { value: 'hiking', label: 'Hiking & Outdoors' },
            { value: 'business', label: 'Business & Meetings' },
            { value: 'general', label: 'Sightseeing / General' },
          ], defaultValue: 'general' },
          { id: 'gender', label: 'Gender/Pref', type: 'select', options: [
            { value: 'm', label: 'Male' },
            { value: 'f', label: 'Female' },
            { value: 'n', label: 'Neutral' },
          ], defaultValue: 'n' },
        ],
        calculate: (v) => {
          return generatePackingList(v.duration, v.weather, [v.activities], v.gender);
        },
        renderResult: (data) => <PackingListResult data={data} />,
        isPopular: true,
        isNew: true
      }
    ]
  }
];

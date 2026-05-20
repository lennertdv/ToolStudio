
export interface PackingItem {
  id: string;
  name: string;
  quantity: number;
  category: 'Clothing' | 'Toiletries' | 'Electronics' | 'Documents' | 'Miscellaneous';
  weight: number; // in grams
  volume: number; // in cm3 (approx)
}

export interface PackingList {
  items: PackingItem[];
  totalWeight: number; // grams
  totalVolume: number; // cm3
  warnings: string[];
}

export const PACKING_DATA: Record<string, Partial<PackingItem>[]> = {
  general: [
    { name: 'Passport/ID', category: 'Documents', weight: 50, volume: 50 },
    { name: 'Travel Insurance Documents', category: 'Documents', weight: 30, volume: 20 },
    { name: 'Phone + Charger', category: 'Electronics', weight: 300, volume: 200 },
    { name: 'Power Bank', category: 'Electronics', weight: 400, volume: 150 },
    { name: 'Toothbrush & Paste', category: 'Toiletries', weight: 150, volume: 100 },
    { name: 'Deodorant', category: 'Toiletries', weight: 100, volume: 80 },
    { name: 'Shampoo/Soap', category: 'Toiletries', weight: 200, volume: 150 },
    { name: 'Medication', category: 'Toiletries', weight: 100, volume: 100 },
  ],
  beach: [
    { name: 'Swimwear', category: 'Clothing', weight: 200, volume: 150 },
    { name: 'Beach Towel', category: 'Clothing', weight: 500, volume: 800 },
    { name: 'Sunscreen', category: 'Toiletries', weight: 200, volume: 150 },
    { name: 'Sunglasses', category: 'Miscellaneous', weight: 50, volume: 50 },
    { name: 'Flip Flops', category: 'Clothing', weight: 300, volume: 400 },
  ],
  hiking: [
    { name: 'Hiking Boots', category: 'Clothing', weight: 1200, volume: 2000 },
    { name: 'Water Bottle (Reusable)', category: 'Miscellaneous', weight: 200, volume: 500 },
    { name: 'Rain Jacket', category: 'Clothing', weight: 400, volume: 600 },
    { name: 'Flashlight/Headlamp', category: 'Electronics', weight: 150, volume: 100 },
    { name: 'First Aid Kit (Extra)', category: 'Toiletries', weight: 300, volume: 400 },
  ],
  business: [
    { name: 'Suit/Formal Wear', category: 'Clothing', weight: 1500, volume: 3000 },
    { name: 'Formal Shoes', category: 'Clothing', weight: 1000, volume: 1500 },
    { name: 'Laptop + Charger', category: 'Electronics', weight: 2000, volume: 1000 },
    { name: 'Notebook & Pen', category: 'Miscellaneous', weight: 200, volume: 100 },
    { name: 'Business Cards', category: 'Documents', weight: 50, volume: 20 },
  ],
  cold: [
    { name: 'Heavy Jacket', category: 'Clothing', weight: 1500, volume: 4000 },
    { name: 'Gloves', category: 'Clothing', weight: 100, volume: 100 },
    { name: 'Beanie', category: 'Clothing', weight: 100, volume: 100 },
    { name: 'Scarf', category: 'Clothing', weight: 150, volume: 200 },
    { name: 'Thermal Underwear', category: 'Clothing', weight: 300, volume: 300 },
  ],
  hot: [
    { name: 'T-shirts/Tops', category: 'Clothing', weight: 150, volume: 150 },
    { name: 'Shorts', category: 'Clothing', weight: 250, volume: 250 },
    { name: 'Hats/Cap', category: 'Miscellaneous', weight: 100, volume: 100 },
  ],
};

export function generatePackingList(
  duration: number,
  weather: 'hot' | 'cold' | 'moderate',
  activities: string[],
  gender: string
): PackingList {
  const items: PackingItem[] = [];
  
  // Base items per category
  const baseData = [...PACKING_DATA.general];
  
  if (weather === 'hot') baseData.push(...PACKING_DATA.hot);
  if (weather === 'cold') baseData.push(...PACKING_DATA.cold);
  
  activities.forEach(act => {
    if (PACKING_DATA[act]) {
      baseData.push(...PACKING_DATA[act]);
    }
  });

  // Calculate quantities based on duration
  const clothingMultiplier = Math.max(1, Math.min(7, duration)); // Cap some items at 1 week supply for laundry
  const underwearQty = duration + 1;
  const socksQty = duration + 1;
  const shirtQty = Math.ceil(duration / 1.5);

  items.push({ id: 'underwear', name: 'Underwear', quantity: underwearQty, category: 'Clothing', weight: 50 * underwearQty, volume: 50 * underwearQty });
  items.push({ id: 'socks', name: 'Socks', quantity: socksQty, category: 'Clothing', weight: 40 * socksQty, volume: 40 * socksQty });

  baseData.forEach((d, index) => {
    let qty = 1;
    if (d.category === 'Clothing' && !['Boots', 'Shoes', 'Jacket'].some(kw => d.name?.includes(kw))) {
      qty = shirtQty;
    }

    items.push({
      id: `item-${index}`,
      name: d.name || 'Unknown',
      quantity: qty,
      category: d.category as any || 'Miscellaneous',
      weight: (d.weight || 100) * qty,
      volume: (d.volume || 100) * qty
    });
  });

  const totalWeight = items.reduce((acc, i) => acc + i.weight, 0);
  const totalVolume = items.reduce((acc, i) => acc + i.volume, 0);

  const warnings = [];
  if (totalWeight > 7000) warnings.push('Carry-on alert: Your bag likely exceeds 7kg limit.');
  if (totalWeight > 23000) warnings.push('Check-in alert: Your bag likely exceeds standard 23kg limit.');
  if (items.filter(i => i.category === 'Clothing').length > 15) warnings.push('You might be overpacking on clothes. Consider laundry!');

  return {
    items,
    totalWeight,
    totalVolume,
    warnings
  };
}

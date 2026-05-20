
import React, { useState } from 'react';
import { PackingList, PackingItem } from '@/src/data/packingItems';
import { jsPDF } from 'jspdf';
import { Check, Download, AlertTriangle, Package, Luggage, Weight } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { motion } from 'motion/react';

interface Props {
  data: PackingList;
}

export const PackingListResult: React.FC<Props> = ({ data }) => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleItem = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const categories = Array.from(new Set(data.items.map(i => i.category)));

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text('Packing List - ToolStudio', 20, 20);
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 28);
    
    doc.text(`Total Estimated Weight: ${(data.totalWeight / 1000).toFixed(2)} kg`, 20, 35);
    
    let y = 45;
    categories.forEach(cat => {
      doc.setFontSize(14);
      doc.setTextColor(0, 102, 204);
      doc.text(cat, 20, y);
      y += 7;
      
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      const catItems = data.items.filter(i => i.category === cat);
      catItems.forEach(item => {
        doc.text(`[ ] ${item.quantity}x ${item.name}`, 25, y);
        y += 6;
        if (y > 280) {
          doc.addPage();
          y = 20;
        }
      });
      y += 5;
    });

    doc.save('toolstudio-packing-list.pdf');
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center space-x-4">
          <div className="bg-blue-50 p-3 rounded-lg text-[#0066cc]">
            <Weight className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Est. Weight</p>
            <p className="text-xl font-bold text-[#1a1a2e]">{(data.totalWeight / 1000).toFixed(2)} kg</p>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center space-x-4">
          <div className="bg-purple-50 p-3 rounded-lg text-purple-600">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Space Needed</p>
            <p className="text-xl font-bold text-[#1a1a2e]">{(data.totalVolume / 1000).toFixed(1)} L</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center space-x-4">
          <div className="bg-orange-50 p-3 rounded-lg text-orange-600">
            <Luggage className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Status</p>
            <p className={cn(
              "text-xl font-bold",
              data.totalWeight > 7000 ? "text-orange-600" : "text-green-600"
            )}>
              {data.totalWeight > 23000 ? 'Overweight!' : data.totalWeight > 7000 ? 'Check-in only' : 'Carry-on OK'}
            </p>
          </div>
        </div>
      </div>

      {/* Warnings */}
      {data.warnings.length > 0 && (
        <div className="space-y-2">
          {data.warnings.map((w, idx) => (
            <div key={idx} className="flex items-center space-x-3 bg-orange-50 border-l-4 border-orange-400 p-4 rounded-r-lg text-orange-800 text-sm font-medium">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <span>{w}</span>
            </div>
          ))}
        </div>
      )}

      {/* Checklist */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-md overflow-hidden">
        <div className="bg-[#1a1a2e] p-6 flex justify-between items-center">
          <h3 className="text-white font-bold text-lg">Your Smart Packing List</h3>
          <button 
            onClick={downloadPDF}
            className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors text-sm font-bold border border-white/20"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </button>
        </div>

        <div className="p-6 md:p-8 space-y-8">
          {categories.map(cat => (
            <div key={cat} className="space-y-4">
              <h4 className="text-[#0066cc] font-black uppercase tracking-widest text-xs border-b border-gray-100 pb-2">{cat}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {data.items.filter(i => i.category === cat).map(item => (
                  <label 
                    key={item.id}
                    className={cn(
                      "flex items-center space-x-4 p-3 rounded-xl border transition-all cursor-pointer group hover:border-[#0066cc]/30",
                      checkedItems[item.id] ? "bg-gray-50 border-gray-100 opacity-60" : "bg-white border-gray-200"
                    )}
                  >
                    <div className="relative flex items-center justify-center">
                      <input 
                        type="checkbox" 
                        className="sr-only" 
                        checked={!!checkedItems[item.id]} 
                        onChange={() => toggleItem(item.id)}
                      />
                      <div className={cn(
                        "w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all",
                        checkedItems[item.id] ? "bg-[#0066cc] border-[#0066cc]" : "border-gray-200 bg-white group-hover:border-[#0066cc]"
                      )}>
                        {checkedItems[item.id] && <Check className="w-4 h-4 text-white" />}
                      </div>
                    </div>
                    <div className="flex-grow">
                      <span className={cn(
                        "font-bold text-sm block",
                        checkedItems[item.id] ? "line-through text-gray-400" : "text-[#1a1a2e]"
                      )}>
                        {item.name}
                      </span>
                      <span className="text-[10px] text-gray-400 uppercase tracking-tighter font-semibold">Qty: {item.quantity} • {item.weight >= 1000 ? `${(item.weight/1000).toFixed(1)}kg` : `${item.weight}g`}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Printer } from 'lucide-react';
import { useStore } from '../store';

const PrintModule = () => {
  const componentRef = useRef<HTMLDivElement>(null);
  const { companyName } = useStore();
  
  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: 'Document_Album',
  });

  return (
    <div className="flex h-full">
      {/* Sidebar Controls */}
      <div className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-6 flex flex-col">
        <h2 className="text-xl font-bold mb-6">Print Module</h2>
        
        <div className="space-y-4 mb-6">
           <div>
              <label className="block text-sm font-medium mb-1">Paper Size</label>
              <select className="w-full px-3 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700">
                 <option>A4 (210 x 297 mm)</option>
                 <option>PVC Card</option>
              </select>
           </div>
           <div>
              <label className="block text-sm font-medium mb-1">Margins</label>
              <select className="w-full px-3 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700">
                 <option>Default</option>
                 <option>None (Borderless)</option>
              </select>
           </div>
        </div>

        <button 
          onClick={() => handlePrint()} 
          className="mt-auto w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold flex items-center justify-center gap-2 transition-colors"
        >
          <Printer className="w-5 h-5" /> Print Now
        </button>
      </div>

      {/* Print Preview Area */}
      <div className="flex-1 bg-gray-200 dark:bg-gray-950 overflow-auto p-8 flex items-center justify-center">
        {/* Printable Area */}
        <div 
          ref={componentRef}
          className="bg-white shadow-xl relative"
          style={{ 
            width: '210mm', 
            height: '297mm',
            padding: '10mm',
          }}
        >
          <div className="text-center mb-8 border-b pb-4">
             <h1 className="text-2xl font-bold text-gray-800">{companyName}</h1>
             <p className="text-gray-500">Document Album generated via MD Album Creator</p>
          </div>
          
          <div className="grid grid-cols-2 grid-rows-4 gap-4 h-[80%]">
             {Array.from({ length: 8 }).map((_, i) => (
               <div key={i} className="border-2 border-gray-400 border-dashed rounded flex items-center justify-center">
                 <span className="text-gray-400">Card Slot {i + 1}</span>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintModule;

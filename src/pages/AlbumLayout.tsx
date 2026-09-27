import React, { useState, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { Download, UploadCloud, Printer, Settings, FileText } from 'lucide-react';
import { toPng } from 'html-to-image';
import { PDFDocument } from 'pdf-lib';

interface CardImage {
  id: string;
  url: string;
}

const AlbumLayout = () => {
  const [images, setImages] = useState<CardImage[]>([]);
  const a4Ref = useRef<HTMLDivElement>(null);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': ['.jpeg', '.jpg', '.png'] },
    onDrop: (acceptedFiles) => {
      const newImages = acceptedFiles.map((file) => ({
        id: Math.random().toString(36).substring(7),
        url: URL.createObjectURL(file),
      }));
      setImages((prev) => [...prev, ...newImages].slice(0, 8)); // Max 8 cards
    },
  });

  const exportPDF = async () => {
    if (!a4Ref.current) return;
    try {
      const dataUrl = await toPng(a4Ref.current, { quality: 1, pixelRatio: 2 });
      const pdf = await PDFDocument.create();
      // A4 dimensions in points: 595.28 x 841.89
      const page = pdf.addPage([595.28, 841.89]); 
      const pngImage = await pdf.embedPng(dataUrl);
      
      page.drawImage(pngImage, {
        x: 0,
        y: 0,
        width: 595.28,
        height: 841.89,
      });

      const pdfBytes = await pdf.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'album.pdf';
      link.click();
    } catch (err) {
      console.error('Failed to generate PDF', err);
    }
  };

  const exportPNG = async () => {
    if (!a4Ref.current) return;
    try {
      const dataUrl = await toPng(a4Ref.current, { quality: 1, pixelRatio: 2 });
      const link = document.createElement('a');
      link.download = 'album.png';
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to generate PNG', err);
    }
  };

  // 8 slots for the 2x4 layout
  const slots = Array.from({ length: 8 });

  return (
    <div className="flex h-full">
      {/* Tools Sidebar */}
      <div className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold mb-4">Layout Options</h2>
          <div className="space-y-4">
            <div className="flex gap-2">
              <button className="flex-1 py-2 px-3 bg-blue-50 text-blue-700 rounded-lg font-medium border border-blue-200">2x4 (8 Cards)</button>
              <button className="flex-1 py-2 px-3 bg-gray-50 text-gray-600 rounded-lg font-medium border border-gray-200 hover:bg-gray-100">2x2 (4 Cards)</button>
            </div>
            
            <div 
              {...getRootProps()} 
              className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center cursor-pointer hover:border-blue-500 transition-colors bg-gray-50 dark:bg-gray-900/50"
            >
              <input {...getInputProps()} />
              <UploadCloud className="w-8 h-8 mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-600 dark:text-gray-400">Drag & drop images here, or click to select files</p>
            </div>
          </div>
        </div>
        
        <div className="p-6 mt-auto border-t border-gray-200 dark:border-gray-700 space-y-3">
          <button onClick={exportPDF} className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-colors">
            <Download className="w-4 h-4" /> Export PDF
          </button>
          <button onClick={exportPNG} className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-colors">
            <FileText className="w-4 h-4" /> Export PNG
          </button>
        </div>
      </div>

      {/* A4 Preview Area */}
      <div className="flex-1 bg-gray-200 dark:bg-gray-950 overflow-auto p-8 flex items-center justify-center">
        {/* Wrapper to handle scaling and shadow without affecting export */}
        <div 
          className="shadow-2xl"
          style={{ transform: 'scale(0.8)', transformOrigin: 'center' }}
        >
          {/* A4 Container (aspect ratio 1:1.414) */}
          <div 
            ref={a4Ref}
            className="bg-white relative"
            style={{ 
              width: '210mm', 
              height: '297mm',
              padding: '10mm',
            }}
          >
          {/* Grid Layout 2x4 with Cut Lines */}
          <div className="w-full h-full grid grid-cols-2 grid-rows-4 gap-0 border-t-2 border-l-2 border-gray-300 border-dashed">
            {slots.map((_, index) => (
              <div 
                key={index}
                className="border-b-2 border-r-2 border-gray-300 border-dashed flex items-center justify-center overflow-hidden relative bg-white p-2"
              >
                {images[index] ? (
                  <img 
                    src={images[index].url} 
                    alt="card" 
                    className="w-full h-full object-fill"
                  />
                ) : (
                  <span className="text-gray-300 text-sm font-medium flex flex-col items-center">
                    <span>Slot {index + 1}</span>
                    <span className="text-xs mt-1">(Cut along dashed lines)</span>
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumLayout;

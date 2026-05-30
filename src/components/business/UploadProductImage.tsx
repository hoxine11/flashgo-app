import React, { useRef, useState } from 'react';
import { Camera, Image as ImageIcon, Check } from 'lucide-react';

interface UploadProductImageProps {
  imageValue: string;
  onChangeValue: (url: string) => void;
}

// Curated gorgeous food and delivery preset items for rapid instant select
const PHOTO_PRESETS = [
  { id: 'burger', name: 'Burger', url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=300' },
  { id: 'pizza', name: 'Pizza', url: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=300' },
  { id: 'salad', name: 'Salad', url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=300' },
  { id: 'cola', name: 'Soda', url: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=300' },
  { id: 'fries', name: 'Fries', url: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=300' },
  { id: 'cake', name: 'Dessert', url: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=300' }
];

export const UploadProductImage: React.FC<UploadProductImageProps> = ({ imageValue, onChangeValue }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          onChangeValue(uploadEvent.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const onDragLeave = () => {
    setDragActive(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          onChangeValue(uploadEvent.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerGallery = () => {
    fileInputRef.current?.click();
  };

  const triggerCamera = () => {
    cameraInputRef.current?.click();
  };

  return (
    <div id="upload-image-container" className="space-y-4">
      {/* Hidden inputs to capture system events */}
      <input
        id="camera-capture-input"
        type="file"
        ref={cameraInputRef}
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
        className="hidden"
      />
      <input
        id="gallery-picker-input"
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Main Drag & Drop / Visual Indicator Canvas */}
      <div
        id="image-drop-canvas"
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={`relative h-56 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center p-6 text-center transition-all ${
          dragActive
            ? 'border-amber-400 bg-amber-400/5'
            : imageValue
            ? 'border-zinc-800 bg-zinc-900/40'
            : 'border-zinc-800 hover:border-zinc-700 bg-zinc-950'
        }`}
      >
        {imageValue ? (
          <div id="image-preview-wrapper" className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden group">
            <img
              id="uploaded-image-preview"
              src={imageValue}
              alt="Uploaded Product"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {/* Dynamic change bar */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={triggerCamera}
                className="p-3 bg-zinc-900 rounded-full hover:bg-zinc-850 text-amber-400 cursor-pointer"
                title="Retake Photo"
              >
                <Camera className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={triggerGallery}
                className="p-3 bg-zinc-900 rounded-full hover:bg-zinc-850 text-amber-400 cursor-pointer"
                title="Choose another image"
              >
                <ImageIcon className="w-5 h-5" />
              </button>
            </div>
            {/* Tag indicator */}
            <div className="absolute bottom-3 left-3 bg-zinc-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] text-zinc-300 font-sans border border-zinc-850 flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-green-500 stroke-[3px]" />
              Ready to Save
            </div>
          </div>
        ) : (
          <div id="image-upload-prompt" className="space-y-3 pointer-events-none">
            <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center mx-auto text-amber-400">
              <Camera className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-zinc-200 font-sans">Upload your product photo</p>
              <p className="text-[10px] text-zinc-500 font-sans mt-1">Drag and drop file here, or use the buttons below</p>
            </div>
          </div>
        )}
      </div>

      {/* Upload buttons line */}
      <div id="upload-buttons-row" className="grid grid-cols-2 gap-3">
        <button
          id="btn-trigger-camera"
          type="button"
          onClick={triggerCamera}
          className="flex items-center justify-center gap-1.5 bg-zinc-905 hover:bg-zinc-850 border border-zinc-800 py-3 px-4 rounded-xl text-xs font-bold font-sans text-zinc-200 transition-colors cursor-pointer"
        >
          <Camera className="w-4 h-4 text-amber-400" />
          Take Photo
        </button>

        <button
          id="btn-trigger-gallery"
          type="button"
          onClick={triggerGallery}
          className="flex items-center justify-center gap-1.5 bg-zinc-905 hover:bg-zinc-850 border border-zinc-800 py-3 px-4 rounded-xl text-xs font-bold font-sans text-zinc-200 transition-colors cursor-pointer"
        >
          <ImageIcon className="w-4 h-4 text-amber-400" />
          Choose Gallery
        </button>
      </div>

      {/* Preset options line */}
      <div id="preset-selector-block" className="pt-2">
        <span className="text-[10px] tracking-wider font-bold text-zinc-500 uppercase font-sans">
          Or Quick Select High-Quality Presets
        </span>
        <div id="preset-buttons-grid" className="grid grid-cols-6 gap-2 mt-2">
          {PHOTO_PRESETS.map((preset) => {
            const isSelected = imageValue === preset.url;
            return (
              <button
                id={`preset-btn-${preset.id}`}
                key={preset.id}
                type="button"
                onClick={() => onChangeValue(preset.url)}
                className={`relative h-11 rounded-lg overflow-hidden border transition-all cursor-pointer ${
                  isSelected ? 'ring-2 ring-amber-400 border-transparent' : 'border-zinc-800'
                }`}
                title={preset.name}
              >
                <img
                  src={preset.url}
                  alt={preset.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                {isSelected && (
                  <div className="absolute inset-0 bg-amber-400/20 flex items-center justify-center">
                    <Check className="w-4 h-4 text-amber-400 stroke-[3px]" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

import { ImagePlus, Upload, X, GripVertical, Replace, Plus } from "lucide-react";

const ImageUploader = ({
  images,
  onFiles,
  onRemoveImage,
  onReplaceImage,
  onDragStart,
  onDragOverReordering,
  onDropReordering,
  draggedItem,
  dragOverItem,
  showReplace = false,
}) => {
  return (
    <div className="space-y-8">
      {/* Label Section */}
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
          <ImagePlus className="w-4 h-4" />
          Media Assets
        </label>
        <span className="text-[10px] font-bold text-gray-400 uppercase">
          {images.length} / 20 Gallery Limit
        </span>
      </div>

      {/* Images Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {images.map((img, index) => {
            const src = img.type === "old" ? img.url : img.preview;

            return (
              <div
                key={img.id}
                draggable
                onDragStart={(e) => onDragStart(e, index)}
                onDragOver={(e) => {
                  e.preventDefault();
                  onDragOverReordering(e, index);
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  onDropReordering(e);
                }}
                className={`relative group aspect-square rounded-4xl overflow-hidden bg-gray-50 transition-all duration-500 shadow-sm border ${
                  dragOverItem === index
                    ? "border-black ring-4 ring-black/5"
                    : "border-gray-100"
                } ${draggedItem === index ? "opacity-20 scale-95" : "opacity-100 scale-100"}`}
              >
                {/* Drag Handle Overlay - Always visible on Mobile, hover on Desktop */}
                <div className="absolute top-3 left-3 z-10 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-white/95 backdrop-blur-md p-2 rounded-full shadow-lg border border-gray-100 cursor-grab active:cursor-grabbing">
                    <GripVertical className="w-4 h-4 text-black" />
                  </div>
                </div>

                {/* Remove Button - Always visible on Mobile, hover on Desktop */}
                <button
                  type="button"
                  onClick={() => onRemoveImage(img.id)}
                  className="absolute top-3 right-3 z-10 bg-white/95 backdrop-blur-md text-red-500 p-2 rounded-full shadow-lg border border-gray-100 opacity-100 md:opacity-0 group-hover:opacity-100 hover:bg-red-500 hover:text-white transition-all active:scale-90"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* The Image */}
                <img
                  src={src}
                  alt="preview"
                  className="w-full h-full object-cover" //grayscale md:grayscale group-hover:grayscale-0 transition-all duration-700 (if needed)
                />

                {/* Replace Button Overlay - Visible on Mobile, hover on Desktop */}
                {showReplace && img.type === "old" && (
                  <label className="absolute inset-x-3 bottom-3 bg-black/80 backdrop-blur-md text-[9px] font-black uppercase tracking-widest py-2.5 rounded-xl text-white text-center cursor-pointer opacity-100 md:opacity-0 group-hover:opacity-100 transform translate-y-0 md:translate-y-2 group-hover:translate-y-0 transition-all active:bg-black">
                    <div className="flex items-center justify-center gap-1.5">
                      <Replace className="w-3.5 h-3.5" />
                      Replace
                    </div>
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={(e) =>
                        e.target.files &&
                        onReplaceImage(img.id, e.target.files[0])
                      }
                    />
                  </label>
                )}
                
                {/* Badge for Type */}
                <div className="absolute bottom-3 left-3 text-[8px] font-black uppercase text-gray-400 bg-white/50 px-1.5 py-0.5 rounded pointer-events-none md:group-hover:opacity-0 transition-opacity">
                  {img.type === 'old' ? 'Stored' : 'Ready'}
                </div>
              </div>
            );
          })}

          {/* Inline Add Button */}
          <label className="aspect-square rounded-4xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:border-black hover:bg-gray-50 transition-all group active:scale-95">
            <Plus className="w-6 h-6 text-gray-400 group-hover:text-black transition-colors" />
            <input
              type="file"
              multiple
              hidden
              accept="image/*"
              onChange={(e) => onFiles(e.target.files)}
            />
          </label>
        </div>
      )}

      {/* Main Upload Zone */}
      {images.length === 0 && (
        <label className="block bg-gray-50 border-2 border-dashed border-gray-200 rounded-[2.5rem] p-12 lg:p-20 text-center cursor-pointer hover:border-black hover:bg-white transition-all group active:scale-[0.99]">
          <div className="w-20 h-20 bg-white rounded-4xl flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:shadow-xl transition-all">
            <Upload className="w-8 h-8 text-black" />
          </div>
          <p className="text-xl font-bold tracking-tighter uppercase mb-2">Import Discovery Assets</p>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
            Drag & Drop or click to browse (PNG, JPG, Max 5MB)
          </p>
          <input
            type="file"
            multiple
            hidden
            accept="image/*"
            onChange={(e) => onFiles(e.target.files)}
          />
        </label>
      )}
    </div>
  );
};

export default ImageUploader;
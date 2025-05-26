import { useRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface ImageUploaderProps {
  images: File[];
  setImages: (files: File[]) => void;
  max?: number;
}

export default function ImageUploader({
  images,
  setImages,
  max = 6,
}: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUploadClick = () => {
    if (images.length >= max) {
      alert(`이미지는 최대 ${max}장까지 업로드할 수 있습니다.`);
      return;
    }
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selectedFiles = Array.from(e.target.files);
    const totalImages = [...images, ...selectedFiles].slice(0, max);
    setImages(totalImages);
  };

  const handleImageRemove = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className="mt-3 w-full">
      <div className="flex gap-[11.6px] flex-wrap">
        {images.map((file, idx) => (
          <div key={idx} className="relative w-[81px] h-[81px]">
            <img
              src={URL.createObjectURL(file)}
              alt={`preview-${idx}`}
              className="w-full h-full object-cover rounded-[5px]"
            />
            <button
              type="button"
              onClick={() => handleImageRemove(idx)}
              className={twMerge(
                "absolute -top-1 -right-1 text-black bg-white rounded-full", 
                "w-[21px] h-[21px] flex items-center justify-center text-lg font-bold"
              )}
            >
              ×
            </button>
          </div>
        ))}
        {images.length < max && (
          <button
            type="button"
            onClick={handleImageUploadClick}
            className="w-[80px] h-[80px] flex items-center justify-center border rounded text-[#888]"
          >
            +
          </button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        hidden
        onChange={handleImageChange}
      />
    </div>
  );
}

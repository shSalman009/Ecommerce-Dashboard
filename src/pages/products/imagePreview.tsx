import { Trash2 } from "lucide-react";

interface ImagePreviewProps {
  preview: string;
  index: number;
  handleRemoveImage: (index: number) => void;
}

export function ImagePreview({
  preview,
  index,
  handleRemoveImage,
}: ImagePreviewProps) {
  return (
    <div
      key={preview}
      className="flex justify-center items-center border p-2 rounded relative group"
    >
      <img className="max-h-[150px] rounded max-w-full" src={preview} alt="" />

      <div className="absolute w-full h-full inset-0 hidden group-hover:flex p-2 rounded justify-center items-center bg-gray-800 bg-opacity-50 transition-all">
        <Trash2
          className="cursor-pointer text-white"
          onClick={() => handleRemoveImage(index)}
        />
      </div>
    </div>
  );
}

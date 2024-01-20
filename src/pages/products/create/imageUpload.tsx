import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getImageData } from "@/lib/utils";
import { UploadCloud } from "lucide-react";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { ImagePreview } from "../imagePreview";

interface ImageUploadProps {
  isSuccess: boolean;
}

function ImageUpload({ isSuccess }: ImageUploadProps) {
  const form = useFormContext();

  const [previews, setPreviews] = useState<string[]>([]);

  const handleRemoveImage = (index: number) => {
    const images = form.getValues().images;
    const newImages = images.filter((_: File, i: number) => i !== index);
    form.setValue("images", newImages);
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (isSuccess) {
      setPreviews([]);
    }
  }, [isSuccess]);

  return (
    <div className="w-1/3 flex flex-col space-y-8 sticky top-0">
      <div className=" space-y-6">
        <div className="space-y-2">
          <h5>Images</h5>
          <p className="text-gray-600 text-sm">
            Enter your product name, description and other information here.
          </p>
        </div>

        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem className="">
              <FormControl>
                <div>
                  {/* Images list */}
                  <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                    {previews.length > 0 &&
                      previews.map((preview, index) => (
                        <ImagePreview
                          key={preview}
                          preview={preview}
                          index={index}
                          handleRemoveImage={handleRemoveImage}
                        />
                      ))}

                    {/* image upload*/}
                    {previews.length > 0 && (
                      <div className="flex items-center justify-center w-full">
                        <label
                          htmlFor="dropzone-file"
                          className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <UploadCloud className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                              Upload
                            </p>
                          </div>
                          <Input
                            id="dropzone-file"
                            className="hidden"
                            type="file"
                            {...field}
                            value=""
                            onChange={(event) => {
                              const { files, displayUrl } = getImageData(event);
                              setPreviews((prev) => [...prev, displayUrl]);
                              const current = form.getValues().images;
                              field.onChange([...current, files[0]]);
                            }}
                          />
                        </label>
                      </div>
                    )}
                  </div>
                  {previews.length === 0 && (
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <UploadCloud className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">
                              Click to upload
                            </span>
                            or drag and drop
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            SVG, PNG, JPG or GIF (MAX. 800x400px)
                          </p>

                          <Input
                            id="dropzone-file"
                            className="hidden"
                            type="file"
                            {...field}
                            value=""
                            onChange={(event) => {
                              const { files, displayUrl } = getImageData(event);
                              setPreviews((prev) => [...prev, displayUrl]);
                              field.onChange([files[0]]);
                            }}
                          />
                        </div>
                      </label>
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}

export default ImageUpload;

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

interface PreviewProps {
  url: string;
  status: "old" | "new";
}

interface ImageUpdateProps {
  isSuccess: boolean;
  images: string[];
}
function ImageUpdate({ isSuccess, images }: ImageUpdateProps) {
  const form = useFormContext();

  const [previews, setPreviews] = useState<PreviewProps[]>([]);

  const handleRemoveImage = (index: number) => {
    const previewToRemove = previews[index];
    if (previewToRemove.status === "old") {
      const removedImageUrl = previewToRemove.url;

      form.setValue("imagesToRemove", [
        ...(form.getValues().imagesToRemove || []),
        removedImageUrl,
      ]);

      const current = form.getValues().images;
      form.setValue(
        "images",
        current.filter((_: string, i: number) => i !== index)
      );
    } else if (previewToRemove.status === "new") {
      const oldImagesLength = previews.filter(
        (preview) => preview.status === "old"
      ).length;
      const indexToRemove = index - oldImagesLength;
      const current = form.getValues().newImages;
      form.setValue(
        "newImages",
        current.filter((_: string, i: number) => i !== indexToRemove)
      );
    }
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (isSuccess) {
      // re fetch the product
      // productsApi.endpoints.getProductBySlug.initiate();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (images.length > 0) {
      setPreviews(
        images.map((image) => ({
          url: image,
          status: "old",
        }))
      );
    }
  }, [images]);

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
          name="newImages"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                {/* Images list */}
                <div>
                  {" "}
                  <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                    {previews.length > 0 &&
                      previews.map((preview, index) => (
                        <ImagePreview
                          key={preview.url}
                          preview={preview.url}
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
                              setPreviews((prev) => [
                                ...prev,
                                { url: displayUrl, status: "new" },
                              ]);
                              const current = form.getValues().newImages;
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
                              setPreviews([{ url: displayUrl, status: "new" }]);
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

export default ImageUpdate;

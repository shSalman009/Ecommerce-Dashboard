import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateBlogMutation } from "@/features/blogs/blogApi";
import { errorToast, successToast } from "@/lib/toast";
import { BlogType } from "@/types/blog";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, UploadCloud } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

// form schema
const formSchema = z.object({
  title: z.string().min(5).max(100),
  description: z.string().min(10).max(5000),
  image: z.union([z.string(), z.instanceof(File)]).refine(
    (val) => {
      if (!val) return false;

      if (val instanceof File) {
        return val.size < 1000000;
      }
      return true;
    },
    { message: "Image is required and size should be less than 1 MB" }
  ),
  imageToRemove: z.string().optional(),
});

interface Props {
  blog: BlogType;
}

// FORM COMPONENT
function UpdateBlogForm({ blog }: Props) {
  const { id, title, description, image } = blog;

  const [displayUrl, setDisplayUrl] = useState<string | null>(image);

  // form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title,
      description,
      image,
      imageToRemove: "",
    },
  });

  const [updateBlog, { data, isLoading, isSuccess, isError, error }] =
    useUpdateBlogMutation();

  // form submission
  function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    const data = {
      title: values.title,
      description: values.description,
      image: "",
      imageToRemove: values.imageToRemove,
    };

    if (values.image instanceof File) {
      formData.append("image", values.image);
    }

    if (typeof values.image === "string") {
      data.image = values.image;
    }

    formData.append("data", JSON.stringify(data));

    updateBlog({ id, data: formData });
  }

  // image handler
  const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("image", file);
      form.clearErrors("image");
      setDisplayUrl(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    form.setValue("imageToRemove", image);
    form.setValue("image", "");
    setDisplayUrl(null);
  };

  // action after submission
  useEffect(() => {
    if (isSuccess) {
      successToast(data?.message, {
        position: "top-right",
      });
    }
    if (isError && error) {
      errorToast("Something Went wrong!", {
        position: "top-right",
      });
    }
  }, [isSuccess, data, isError, error]);

  return (
    <>
      <div className="flex flex-col">
        <Card className="border-none shadow-none">
          <CardHeader>
            <CardTitle>Edit Existing Blog</CardTitle>
            <CardDescription>
              Fill up the form below to edit the blog.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex gap-4">
                  {/* Name field */}
                  <div className="w-4/6">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Title" {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* Description field */}
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              rows={8}
                              placeholder="Description"
                              {...field}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />{" "}
                    <Button disabled={isLoading} type="submit" className="mt-4">
                      {isLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : null}
                      Update
                    </Button>
                  </div>

                  {/* Image upload field */}
                  <div className="w-2/6">
                    <FormField
                      control={form.control}
                      name="image"
                      render={() => (
                        <FormItem>
                          <FormLabel>Image</FormLabel>
                          <FormControl>
                            {displayUrl ? (
                              <div className="w-full">
                                <img
                                  src={displayUrl}
                                  alt="preview"
                                  className="w-full rounded mb-2"
                                />
                                <Button
                                  className="w-full"
                                  variant="outline"
                                  size="sm"
                                  onClick={handleRemoveImage}
                                >
                                  Remove Image
                                </Button>
                              </div>
                            ) : (
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
                                      onChange={handleAddImage}
                                    />
                                  </div>
                                </label>
                              </div>
                            )}
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default UpdateBlogForm;

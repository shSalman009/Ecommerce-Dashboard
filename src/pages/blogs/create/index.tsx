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
import { useAddBlogMutation } from "@/features/blogs/blogApi";
import { errorToast, successToast } from "@/lib/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, UploadCloud } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  title: z.string().min(5).max(100),
  description: z.string().min(10).max(1000),
  image: z.union([z.string(), z.instanceof(File)]).refine(
    (val) => {
      if (!val) return false;

      if (val instanceof File) {
        return val.size < 1000000;
      }
      return true;
    },
    { message: "Image must be a valid file and size should be less than 1 MB" }
  ),
});

function CreateBlogForm() {
  const [displayUrl, setDisplayUrl] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      image: "",
    },
  });

  const [addBlog, { data, isLoading, isSuccess, isError, error }] =
    useAddBlogMutation();

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    const data = {
      title: values.title,
      description: values.description,
    };

    formData.append("data", JSON.stringify(data));

    if (values.image instanceof File) {
      formData.append("image", values.image);
    }

    addBlog(formData);
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
    form.setValue("image", "");
    setDisplayUrl(null);
  };

  // action after submission
  useEffect(() => {
    if (isSuccess) {
      form.reset();
      setDisplayUrl(null);
      successToast(data?.message, {
        position: "top-right",
      });
    }
    if (isError && error) {
      errorToast("Something Went wrong!", {
        position: "top-right",
      });
    }
  }, [isSuccess, data, isError, error, form]);

  return (
    <>
      <div className="flex flex-col">
        <Card className="border-none shadow-none">
          <CardHeader>
            <CardTitle>Add New Blog</CardTitle>
            <CardDescription>
              Fill out the information below to create a new blog.
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
                    />
                    <Button disabled={isLoading} type="submit" className="mt-4">
                      {isLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : null}
                      Add
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

export default CreateBlogForm;

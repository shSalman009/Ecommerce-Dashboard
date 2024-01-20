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
import { useUpdateCategoryMutation } from "@/features/category/categoryApi";
import { errorToast, successToast } from "@/lib/toast";
import { CategoryType } from "@/types/category";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

// form schema
const formSchema = z.object({
  name: z.string().min(3).max(20),
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
  imageToRemove: z.string().optional(),
});

interface Props {
  category: CategoryType;
}

// FORM COMPONENT
function EditCategoryForm({ category }: Props) {
  const { name, image, slug } = category;

  const [displayUrl, setDisplayUrl] = useState<string | null>(image);

  // form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name,
      image,
      imageToRemove: "",
    },
  });

  const [updateCategory, { data, isLoading, isSuccess, isError, error }] =
    useUpdateCategoryMutation();

  // form submission
  function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    const data = {
      name: values.name,
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

    updateCategory({ slug, data: formData });
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
            <CardTitle>Edit Existing Category</CardTitle>
            <CardDescription>
              Fill up the form below to edit the category.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                {/* Name field */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Name" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Image upload field */}
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
                          <Input type="file" onChange={handleAddImage} />
                        )}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button disabled={isLoading} type="submit">
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Update
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default EditCategoryForm;

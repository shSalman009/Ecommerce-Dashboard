import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input, InputIcon } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useGetBrandsQuery } from "@/features/brands/brandsApi";
import { useGetCategoriesQuery } from "@/features/category/categoryApi";
import { useUpdateProductMutation } from "@/features/products/productsApi";
import { errorToast, successToast } from "@/lib/toast";
import { ProductType } from "@/types/products";
import { zodResolver } from "@hookform/resolvers/zod";
import { DollarSign, Loader2 } from "lucide-react";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as z from "zod";
import Dropdown from "../dropdown";
import Features from "../features";
import Specifications from "../specifications";
import ImageUpdate from "./imageUpdate";

// Constants
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/webp", "image/png"];
const MIN_FEATURE_LENGTH = 3;
const MAX_FEATURE_LENGTH = 200;
const MIN_SPECIFICATION_LENGTH = 1;
const MAX_SPECIFICATION_LENGTH = 200;

const isValidFileSize = (file: File | Blob) =>
  typeof file === "string" ? true : file.size <= MAX_FILE_SIZE;

const isValidFileType = (file: File | Blob) =>
  typeof file === "string" ? true : ACCEPTED_IMAGE_TYPES.includes(file.type);

// Form Schema
const formSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(3, "Name requires at least 3 characters")
    .max(100, "Name is too long"),
  description: z
    .string()
    .min(1, "Description is required")
    .min(10, "Description requires at least 10 characters")
    .max(1000, "Description is too long"),
  // images will be array of string. but there should be minimum 1 image
  images: z.array(z.string()),
  newImages: z
    .any()
    .refine((files) => files.every(isValidFileSize), "Image size is too large")
    .refine(
      (files) => files.every(isValidFileType),
      "Unsupported image format"
    ),

  imagesToRemove: z.array(z.string()).optional(),
  price: z.string().min(1, "Price is required"),
  discount: z.string().min(0).max(100),
  stock: z.string().min(1, "Stock is required"),
  brand: z.string().min(1, "Brand is required"),
  category: z.string().min(1, "Category is required"),
  features: z.optional(
    z.array(z.string().min(MIN_FEATURE_LENGTH).max(MAX_FEATURE_LENGTH))
  ),
  specifications: z.optional(
    z.record(
      z.string().min(MIN_SPECIFICATION_LENGTH).max(MAX_SPECIFICATION_LENGTH)
    )
  ),
});

// Component
function UpdateProductForm({ product }: { product: ProductType }) {
  // console.log(product);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: product.name,
      description: product.description,
      price: String(product.price),
      discount: String(product.discount),
      stock: String(product.stock),
      brand: product.brand,
      category: String(product.category),
      features: product.features,
      specifications: product.specifications,
      images: product.images,
      newImages: [],
      imagesToRemove: [],
    },
  });

  useEffect(() => {
    // form errors
    // console.log(form.getValues());

    console.log(form.formState.errors);
  }, [form]);

  // create product mutation
  const [
    updateProduct,
    { data: newData, error, isError, isLoading, isSuccess },
  ] = useUpdateProductMutation();

  // submit handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.images.length === 0 && values.newImages.length === 0) {
      form.setError("newImages", {
        type: "manual",
        message: "At least one image is required",
      });
      return;
    }

    const formData = new FormData();

    values.newImages.forEach((image: File) =>
      formData.append("newImages", image)
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { newImages, ...data } = values;
    formData.append("data", JSON.stringify(data));
    updateProduct({ slug: product.slug, data: formData });
  }

  // after success
  useEffect(() => {
    if (isSuccess) {
      form.reset();
      successToast(newData?.message || "Product created successfully");
      console.log(newData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, newData]);

  // after error
  useEffect(() => {
    if (isError) {
      if (error && "data" in error) {
        errorToast(
          (error.data as { message: string })?.message || "Something went wrong"
        );
      } else {
        errorToast("Something went wrong");
      }
    }
  }, [isError, error]);

  // get brands and categories
  const { data: categoryData } = useGetCategoriesQuery();
  const categories = categoryData?.payload || [];

  const { data: brandData } = useGetBrandsQuery();
  const brands = brandData?.payload || [];

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form
          encType="multipart/form-data"
          onSubmit={form.handleSubmit(onSubmit)}
          className="relative"
        >
          <h3 className="mb-6">Add New Product</h3>
          <div className="flex items-start gap-10">
            {/* left form */}
            <div className="w-2/3 flex flex-col space-y-8">
              {/* basic information */}
              <div className=" space-y-6">
                <div className="space-y-2">
                  <h5>Basic Information</h5>
                  <p className="text-gray-600 text-sm">
                    Enter your product name, description and other information
                    here.
                  </p>
                </div>

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Product Name <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Product Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Product Description{" "}
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe about product"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* Pricing */}{" "}
              <div className=" space-y-6">
                <div className="space-y-2">
                  <h5>Pricing</h5>
                  <p className="text-gray-600 text-sm">
                    Select your product price and inventory.
                  </p>
                </div>
                <div className="flex gap-4">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>
                          Product Price <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <InputIcon
                            icon={
                              <DollarSign size="18" className="text-gray-00" />
                            }
                            type="number"
                            placeholder="Product Price"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="discount"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>
                          Discount{" "}
                          <span className="text-gray-600 text-sm">
                            (Optional)
                          </span>
                        </FormLabel>
                        <FormControl>
                          <InputIcon
                            icon={
                              <DollarSign size="18" className="text-gray-00" />
                            }
                            type="number"
                            placeholder="Discount"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Stock <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Stock" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* Brand & Category */}
              <div className=" space-y-6">
                <div className="space-y-2">
                  <h5>Brand And Category</h5>
                  <p className="text-gray-600 text-sm">
                    Select your product brand and category.
                  </p>
                </div>
                <div className="flex gap-4">
                  <Dropdown name="brand" label="Brand" data={brands} />

                  <Dropdown
                    name="category"
                    label="Category"
                    data={categories}
                  />
                </div>
              </div>
              {/* Features & Specifications */}
              <Features
                MIN_FEATURE_LENGTH={MIN_FEATURE_LENGTH}
                MAX_FEATURE_LENGTH={MAX_FEATURE_LENGTH}
              />
              <Specifications
                MIN_SPECIFICATION_LENGTH={MIN_SPECIFICATION_LENGTH}
                MAX_SPECIFICATION_LENGTH={MAX_SPECIFICATION_LENGTH}
              />
            </div>
            {/* right form */}

            <ImageUpdate isSuccess={isSuccess} images={product.images} />
          </div>
          <div className="sticky p-4 bottom-0 mt-6 bg-gray-100 flex justify-end items-center rounded">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? <Loader2 className="animate-spin" /> : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </FormProvider>
  );
}

export default UpdateProductForm;

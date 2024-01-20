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
import { useUpdateBrandMutation } from "@/features/brands/brandsApi";
import { errorToast, successToast } from "@/lib/toast";
import { BrandType } from "@/types/brands";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(2).max(20),
});

interface Props {
  brand: BrandType;
}
function UpdateBrandForm({ brand }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: brand.name,
    },
  });

  const [updateBrand, { data, isLoading, isSuccess, isError, error }] =
    useUpdateBrandMutation();

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateBrand({ id: brand.id, ...values });
  }

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
  }, [isSuccess, data, isError, error, form]);

  return (
    <>
      <div className="flex flex-col">
        <Card className="border-none shadow-none">
          <CardHeader>
            <CardTitle>Update Brand</CardTitle>
            <CardDescription>
              Fill out the information below to update existing brand.
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

export default UpdateBrandForm;

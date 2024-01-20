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
import { useCreateBrandMutation } from "@/features/brands/brandsApi";
import { errorToast, successToast } from "@/lib/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(3).max(20),
});

function CreateBrandForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const [createBrand, { data, isLoading, isSuccess, isError, error }] =
    useCreateBrandMutation();

  function onSubmit(values: z.infer<typeof formSchema>) {
    createBrand(values);
  }

  // action after submission
  useEffect(() => {
    if (isSuccess) {
      form.reset();
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
            <CardTitle>Add New Brand</CardTitle>
            <CardDescription>
              Fill out the information below to create a new brand.
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
                  Add
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default CreateBrandForm;

import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useDeleteBrandMutation } from "@/features/brands/brandsApi";
import { successToast } from "@/lib/toast";
import { BrandType } from "@/types/brands";
import { useEffect } from "react";
import UpdateBrandForm from "../form/updateBrandForm";

interface Props {
  brand: BrandType;
}

function Actions({ brand }: Props) {
  const [deleteBrand, { isSuccess }] = useDeleteBrandMutation();

  const handleDelete = () => {
    deleteBrand(brand.id);
  };

  useEffect(() => {
    if (isSuccess) {
      console.log(isSuccess);

      successToast("Brand deleted successfully");
    }
  }, [isSuccess]);

  return (
    <div className="space-x-1 text-end">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="hover:text-blue-500">
            <Pencil className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <UpdateBrandForm brand={brand} />
        </SheetContent>
      </Sheet>

      {/* delete product button */}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="ghost" size="icon" className="hover:text-red-500">
            <Trash2 className="h-4 w-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete the product?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              product.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default Actions;

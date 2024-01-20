// import { statuses } from "@/data/tableData
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
import { useDeleteCategoryMutation } from "@/features/category/categoryApi";
import { successToast } from "@/lib/toast";
import { CategoryType } from "@/types/category";
import { useEffect } from "react";
import EditCategoryForm from "../form/EditCategoryForm";

interface Props {
  category: CategoryType;
}

function Actions({ category }: Props) {
  const [deleteCategory, { isLoading, isSuccess }] =
    useDeleteCategoryMutation();

  const handleDelete = () => {
    deleteCategory({ slug: category.slug });
  };

  useEffect(() => {
    if (isSuccess) {
      successToast("Category deleted successfully");
    }
  }, [isSuccess]);

  return (
    <div className="space-x-1">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Pencil className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <EditCategoryForm category={category} />
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
            <AlertDialogAction disabled={isLoading} onClick={handleDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default Actions;

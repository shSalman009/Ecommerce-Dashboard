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
import { Button } from "@/components/ui/button";
import { useDeleteProductMutation } from "@/features/products/productsApi";
import { successToast } from "@/lib/toast";
// import { statuses } from "@/data/tableData";
import { Pencil, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Actions({ slug }: { slug: string }) {
  const navigate = useNavigate();

  const [deleteProduct, { isLoading, isSuccess }] = useDeleteProductMutation();
  const handleDeleteProduct = () => {
    deleteProduct({ slug });
  };

  useEffect(() => {
    if (isSuccess) {
      successToast("Category deleted successfully");
    }
  }, [isSuccess]);

  return (
    <div className="space-x-1">
      <Button
        onClick={() => navigate(`/products/update/${slug}`)}
        variant="ghost"
        size="icon"
        className="hover:text-blue-500"
      >
        <Pencil className="h-4 w-4" />
      </Button>

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
            <AlertDialogAction
              onClick={handleDeleteProduct}
              disabled={isLoading}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default Actions;

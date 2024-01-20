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
import { useDeleteOrderMutation } from "@/features/orders/orderApi";
import { Eye, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Actions({ id }: { id: string }) {
  const navigate = useNavigate();

  const [deleteOrder, { isLoading }] = useDeleteOrderMutation();

  const handleDeleteOrder = () => {
    deleteOrder(id);
  };

  return (
    <div className="space-x-1">
      <Button
        onClick={() => navigate(`/orders/${id}`)}
        variant="ghost"
        size="icon"
        className="hover:text-blue-500"
      >
        <Eye className="h-4 w-4" />
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
            <AlertDialogAction onClick={handleDeleteOrder} disabled={isLoading}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default Actions;

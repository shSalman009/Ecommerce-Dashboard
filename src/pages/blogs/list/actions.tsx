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
import { successToast } from "@/lib/toast";

import { useDeleteBlogMutation } from "@/features/blogs/blogApi";
import { BlogType } from "@/types/blog";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  blog: BlogType;
}

function Actions({ blog }: Props) {
  const [deleteBlog, { isLoading, isSuccess }] = useDeleteBlogMutation();

  const handleDelete = () => {
    deleteBlog({ id: blog.id });
  };

  useEffect(() => {
    if (isSuccess) {
      successToast("Blog deleted successfully");
    }
  }, [isSuccess]);

  const navigate = useNavigate();

  return (
    <div className="space-x-1">
      <Button
        onClick={() => navigate(`/blogs/update/${blog.id}`)}
        variant="ghost"
        size="icon"
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

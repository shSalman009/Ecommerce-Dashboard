import { toast } from "react-hot-toast";

interface Options {
  position?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";
}

// success toast
export const successToast = (
  text?: string,
  { position = "top-center" }: Options = {}
) =>
  toast.success(text || "Success", {
    position,
    style: {
      border: "1px solid #4caf50",
      color: "#4caf50",
    },
  });

// error toast
export const errorToast = (
  text?: string,
  { position = "top-center" }: Options = {}
) =>
  toast.error(text || "Error", {
    position,
    style: {
      border: "1px solid #f44336",
      color: "#f44336",
    },
  });

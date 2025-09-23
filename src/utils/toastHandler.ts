import { toast } from "react-toastify";
import type { ToastType } from "../type";

export const showToast = (message: string, type: ToastType = "info") => {
  switch (type) {
    case "success":
      toast.success(message);
      break;
    case "error":
      toast.error(message);
      break;
    case "info":
      toast.info(message);
      break;
    case "warn":
      toast.warn(message);
      break;
    default:
      toast(message);
  }
};

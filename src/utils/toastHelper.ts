import { toast } from "react-toastify";

export const successToast = (message: string, options = {}) => {
  toast.success(message, { autoClose: 2000, ...options });
};

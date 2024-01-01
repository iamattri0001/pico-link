import { IoIosWarning } from "react-icons/io";

const ErrorToast = ({ message, toast }) => {
  return (
    <div
      className="
      toast-animation border border-accent px-3 py-1.5 rounded-3xl flex items-center justify-center gap-x-2"
    >
      <IoIosWarning />
      <span className="text-sm">{message}</span>
    </div>
  );
};

export default ErrorToast;

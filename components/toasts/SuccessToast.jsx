import { FaCheck } from "react-icons/fa";
const SuccessToast = ({ message, toast }) => {
  return (
    <div
      className="
      toast-animation border border-primary px-4 py-2 rounded-3xl flex items-center justify-center gap-x-2 bg-primary/70"
    >
      <FaCheck />
      <span className="text-sm">{message}</span>
    </div>
  );
};

export default SuccessToast;

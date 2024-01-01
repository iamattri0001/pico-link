import { FaCheck } from "react-icons/fa";
const SuccessToast = ({ message, toast }) => {
  return (
    <div
      className="
      toast-animation border border-primary px-3 py-1.5 rounded-3xl flex items-center justify-center gap-x-2"
    >
      <FaCheck />
      <span className="text-sm">{message}</span>
    </div>
  );
};

export default SuccessToast;

import { FaExclamationTriangle } from "react-icons/fa";

interface formErrorProps {
  message?: string;
}
const FormError = ({ message }: formErrorProps) => {
  if (!message) {  
    return null;
  }  
  return <div className="bg-destructive/15 text-destructive p-3 rounded-md flex items-center gap-x-2 text-sm  ">
    <FaExclamationTriangle className="h-4 w-4" />
    <p>{message}</p>
  </div>;
};

export default FormError;

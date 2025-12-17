
// PasswordInput.tsx
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import InputLabel from "./InputLabel";

const PasswordInput = ({
  label = "Password",
  id = "password",
  placeholder = "Enter your password",
  rightElement,
  value,
  onChange
}: {
  label?: string;
  id?: string;
  placeholder?: string;
  rightElement?: React.ReactNode;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const [show, setShow] = useState(false);
  return (
    <div className="mb-5">
      <InputLabel htmlFor={id} rightElement={rightElement}>
        {label}
      </InputLabel>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-green-700 focus:ring-1 focus:ring-green-700 outline-none transition-all placeholder-gray-400 text-gray-800 pr-10"
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          {show ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;

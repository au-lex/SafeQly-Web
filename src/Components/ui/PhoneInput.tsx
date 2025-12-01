import { ChevronDown } from "lucide-react";
import InputLabel from "./InputLabel";

const PhoneInput = () => {
  return (
    <div className="mb-5">
      <InputLabel htmlFor="phone">Phone number</InputLabel>
      <div className="flex gap-3">
        <div className="flex-shrink-0 relative">
          <button
            type="button"
            className="h-full px-3 py-3 rounded-lg border border-gray-300 bg-white flex items-center gap-2 hover:border-gray-400 transition-colors"
          >
            <span className="text-xl leading-none">🇳🇬</span>
            <span className="text-gray-700 font-medium">+234</span>
            <ChevronDown size={16} className="text-gray-500" />
          </button>
        </div>
        <input
          type="tel"
          id="phone"
          placeholder="800 000 0000"
          className="flex-1 w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-green-700 focus:ring-1 focus:ring-green-700 outline-none transition-all placeholder-gray-400 text-gray-800"
        />
      </div>
    </div>
  );
};

export default PhoneInput;
import InputLabel from "./InputLabel";



const TextInput = ({
  label,
  placeholder,
  type = "text",
  id
}: {
  label: string;
  placeholder: string;
  type?: string;
  id: string;
}) => (
  <div className="mb-5">
    <InputLabel htmlFor={id}>{label}</InputLabel>
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-green-700 focus:ring-1 focus:ring-green-700 outline-none transition-all placeholder-gray-400 text-gray-800"
    />
  </div>
);


export default TextInput;



const InputLabel = ({ 
  children, 
  htmlFor, 
  rightElement 
}: { 
  children: React.ReactNode; 
  htmlFor?: string; 
  rightElement?: React.ReactNode 
}) => (
  <div className="flex justify-between items-center mb-1.5">
    <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-600">
      {children}
    </label>
    {rightElement}
  </div>
);
export default InputLabel;
import type { ChangeEventHandler } from "react";

type InputProps = {
  label: string;
  id: string;
  type: React.HTMLInputTypeAttribute;
  value?: string | number;
  onChange: ChangeEventHandler<HTMLInputElement>;
  className?: string;
  accept?: string;
  autoComplete?: React.HTMLInputAutoCompleteAttribute;
  inputClassName?: string;
};

function Input({
  label,
  id,
  type,
  value,
  onChange,
  className,
  autoComplete,
  inputClassName = "",
}: InputProps) {
  return (
    <div className={`flex flex-col ${className}`}>
      <label>
        {label} <span className="text-red-500">*</span>
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        required
      />
    </div>
  );
}
export default Input;

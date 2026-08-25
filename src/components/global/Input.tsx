import type { ChangeEventHandler } from "react";

type InputProps = {
  label: string;
  id: string;
  type: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  className?: string;
};

function Input({ label, id, type, value, onChange, className }: InputProps) {
  return (
    <div className="flex flex-col ">
      <label>
        {label} <span className="text-red-500">*</span>
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        className={className}
        required
      />
    </div>
  );
}
export default Input;

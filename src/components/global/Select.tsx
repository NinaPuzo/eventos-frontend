type SelectOption = {
  value: string;
  label: string;
};

type SelectProps = {
  label: string;
  id: string;
  value: string;
  options: SelectOption[];
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  required?: boolean;
  className?: string;
};

function Select({
  label,
  id,
  value,
  options,
  onChange,
  required = false,
  className = "",
}: SelectProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm text-[#ADADAD]">
        {label}
      </label>

      <select
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        className={`h-10 rounded-md border border-[#555555] bg-transparent px-3 text-white outline-none ${className}`}
      >
        <option value="">Izaberi opciju</option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;

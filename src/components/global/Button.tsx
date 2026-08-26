type ButtonProps = {
  type: "button" | "submit" | "reset";
  className?: string;
  label: string;
};

function Button({ type, className, label }: ButtonProps) {
  return (
    <button type={type} className={className}>
      {label}
    </button>
  );
}
export default Button;

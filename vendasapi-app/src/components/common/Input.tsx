import { formatReal } from "../../util/Money";

interface InputProps {
  onChange?: (value: any) => void;
  label: string;
  columnClasses?: string;
  id: string;
  placeholder?: string;
  value?: any;
  disabled?: any;
  currency?: boolean;
}

export default function Input({
  onChange,
  label,
  columnClasses,
  id,
  placeholder,
  value,
  disabled,
  currency,
}: InputProps) {
  const onInputChange = (e: any) => {
    if (onChange) {
      let value = e.target.value;
      if (value && currency) {
        value = formatReal(value);
      }

      onChange(value);
    }
  };

  return (
    <div className={`field column ${columnClasses}`}>
      <label className="label" htmlFor={id}>
        {label}
      </label>
      <div className="control">
        <input
          id={id}
          disabled={disabled}
          value={value}
          onChange={onInputChange}
          type="text"
          className="input"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}

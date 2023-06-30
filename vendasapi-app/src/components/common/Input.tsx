interface InputProps {
  onChange?: (value: any) => void;
  label: string;
  columnClasses?: string;
  id: string;
  placeholder?: string;
  value?: any;
  disabled?: any
}

export default function Input({
  onChange,
  label,
  columnClasses,
  id,
  placeholder,
  value,
  disabled
}: InputProps) {
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
          onChange={(e) => {
            if (onChange) {
              onChange(e.target.value);
            }
          }}
          type="text"
          className="input"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}

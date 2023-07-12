import { formatReal } from "@/util/Money";
import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  columnClasses?: string;
  formatter?: (value: string) => string;
}

export const Input: React.FC<InputProps> = ({
  label,
  columnClasses,
  id,
  formatter,
  onChange,
  ...inputProps
}: InputProps) => {
  const onInputChange = (event: any) => {
    const value = event.target.value;
    const name = event.target.name;

    const formattedValue = (formatter && formatter(value as string)) || value;

    if (onChange) {
      onChange({
        ...event,
        target: {
          name,
          value: formattedValue,
        },
      });
    }
  };

  return (
    <div className={`field column ${columnClasses}`}>
      <label className="label" htmlFor={id}>
        {label}
      </label>
      <div className="control">
        <input
          className="input"
          id={id}
          {...inputProps}
          onChange={onInputChange}
        />
      </div>
    </div>
  );
};

export const InputMoney: React.FC<InputProps> = (props: InputProps) => {
  return <Input {...props} formatter={formatReal} />;
};

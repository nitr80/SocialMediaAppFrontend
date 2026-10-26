import { useId } from "react";
import "./DataInputField.css";

interface Props {
  label: string;
  value: string;
  setValue: (value: string) => void;
  type?: "text" | "email" | "password";
  autoComplete?: string;
}

const DataInputField = ({
  label,
  value,
  setValue,
  type = "text",
  autoComplete,
}: Props) => {
  const id = useId();

  return (
    <div>
      <label htmlFor={id} className="data-input-label">
        {label}
      </label>
      <br />
      <input
        type={type}
        id={id}
        name="fdata"
        className="input-field data-input-field"
        value={value}
        autoComplete={autoComplete}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </div>
  );
};

export default DataInputField;

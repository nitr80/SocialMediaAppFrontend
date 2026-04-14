import "./DataInputField.css";

interface Props {
  label: string;
  value: string;
  setValue: (string) => void;
}

const DataInputField = ({ label, value, setValue }: Props) => {
  return (
    <div>
      <label htmlFor="fdata" className="data-input-label">
        {label}
      </label>
      <br />
      <input
        type="text"
        id="fdata"
        name="fdata"
        className="data-input-field"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </div>
  );
};

export default DataInputField;

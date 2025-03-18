const InputText = ({
  id,
  label,
  required,
  handleChange,
}: {
  id: string;
  label: string;
  required?: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="flex flex-col flex-1/2">
      <label htmlFor={id} className="font-bold">
        {label}
      </label>
      <input
        required={required}
        id={id}
        type="text"
        className="border-2 p-2 rounded-md"
        onChange={handleChange}
      />
    </div>
  );
};

export default InputText;

const InputText = ({
  label,
  handleChange,
}: {
  label: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="flex flex-col flex-1/2">
      <label htmlFor="input-text" className="font-bold">
        {label}
      </label>
      <input
        name="input-text"
        type="text"
        className="border-2 p-2 rounded-md"
        onChange={handleChange}
      />
    </div>
  );
};

export default InputText;

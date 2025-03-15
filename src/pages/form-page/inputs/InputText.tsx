const InputText = ({ label }: { label: string }) => {
  return (
    <div className="flex flex-col flex-1/2">
      <label htmlFor="input-text" className="font-bold">
        {label}
      </label>
      <input
        name="input-text"
        type="text"
        className="border-2 p-2 rounded-md"
      />
    </div>
  );
};

export default InputText;

import InputText from "./InputText";
import { useEffect, useState } from "react";
import Button from "../../../utils/Button";
import { Option } from "../../../components/interfaces/QuizInterfaces";

interface InputRadioProps {
  onUpdate: (options: Option[]) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputRadio = ({ onUpdate, handleChange }: InputRadioProps) => {
  const [options, setOptions] = useState<Option[]>([
    { id: Date.now(), optionText: "", correct: false },
  ]);

  useEffect(() => {
    onUpdate(options);
  }, [options, onUpdate]);

  const addOption = () => {
    const newOption = { id: Date.now(), optionText: "", correct: false };
    setOptions([...options, newOption]);
  };

  const updateOption = (id: number, newText: string) => {
    setOptions((prevOptions) =>
      prevOptions.map((option) =>
        option.id === id ? { ...option, optionText: newText } : option
      )
    );
  };

  const removeOption = (id: number) => {
    setOptions((prevOptions) =>
      prevOptions.filter((option) => option.id !== id)
    );
  };

  return (
    <div>
      <InputText label="Question" handleChange={handleChange} />
      {options.map((option) => (
        <div key={option.id} className="flex flex-row items-center gap-2">
          <InputText
            key={option.id}
            label="Option"
            handleChange={(e) => updateOption(option.id, e.target.value)}
          />

          <Button
            text="Remove Option"
            styles="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded "
            onClick={(e) => {
              e.preventDefault();
              removeOption(option.id);
            }}
          />
        </div>
      ))}
      <Button
        text="Add Choice"
        onClick={(e) => {
          e.preventDefault();
          addOption();
        }}
      />
    </div>
  );
};

export default InputRadio;

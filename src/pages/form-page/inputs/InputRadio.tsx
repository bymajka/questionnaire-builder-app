import InputText from "./InputText";
import { useState } from "react";
import Button from "../../../utils/Button";
import { Option } from "../../../data/QuizInterfaces";

interface InputRadioProps {
  required?: boolean;
  onUpdate: (options: Option[]) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputRadio = ({ required, onUpdate, handleChange }: InputRadioProps) => {
  const [options, setOptions] = useState<Option[]>([
    { id: Date.now(), optionText: "", correct: false },
  ]);

  const addOption = () => {
    const newOption = { id: Date.now(), optionText: "", correct: false };
    const updatedOptions = [...options, newOption];
    setOptions(updatedOptions);
    onUpdate(updatedOptions);
  };

  const updateOption = (id: number, newText: string) => {
    const updatedOptions = options.map((option) =>
      option.id === id ? { ...option, optionText: newText } : option
    );
    setOptions(updatedOptions);
    onUpdate(updatedOptions);
  };

  const removeOption = (id: number) => {
    const updatedOptions = options.filter((option) => option.id !== id);
    setOptions(updatedOptions);
    onUpdate(updatedOptions);
  };

  return (
    <div>
      <InputText
        required={required}
        id="question"
        label="Question"
        handleChange={handleChange}
      />
      {options.map((option) => (
        <div key={option.id} className="flex flex-row items-center gap-2">
          <InputText
            required={required}
            id={`option-${option.id}`}
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
        styles="mt-2"
        text="Add Option"
        onClick={(e) => {
          e.preventDefault();
          addOption();
        }}
      />
    </div>
  );
};

export default InputRadio;

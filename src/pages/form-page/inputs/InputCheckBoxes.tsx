import { useState } from "react";
import { Option } from "../../../data/QuizInterfaces";
import Button from "../../../utils/Button";
import InputText from "./InputText";

interface InputCheckBoxesProps {
  required?: boolean;
  onUpdate: (options: Option[]) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputCheckBoxes = ({
  required,
  onUpdate,
  handleChange,
}: InputCheckBoxesProps) => {
  const [options, setOptions] = useState<Option[]>([]);

  const handleAddOption = () => {
    const newOption: Option = {
      id: Date.now(),
      optionText: "",
      correct: false,
    };
    const newOptions = [...options, newOption];
    setOptions(newOptions);
    onUpdate(newOptions);
  };

  const handleOptionChange = (index: number, optionText: string) => {
    const updatedOptions = options.map((option, idx) =>
      idx === index ? { ...option, optionText } : option
    );
    setOptions(updatedOptions);
    onUpdate(updatedOptions);
  };

  const handleOptionCheck = (index: number) => {
    const newOptions = options.map((opt, idx) =>
      idx === index ? { ...opt, correct: !opt.correct } : opt
    );
    setOptions(newOptions);
    onUpdate(newOptions);
  };

  const handleRemoveOption = (index: number) => {
    const newOptions = options.filter((_, idx) => idx !== index);
    setOptions(newOptions);
    onUpdate(newOptions);
  };

  return (
    <div className="flex flex-col gap-2">
      <InputText
        required={required}
        id="question"
        label="Question"
        handleChange={handleChange}
      />
      {options.map((option, index) => (
        <div key={option.id} className="flex items-center gap-2">
          <input
            required={required}
            type="text"
            value={option.optionText}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            placeholder={`Option ${index + 1}`}
            className="border p-1 rounded"
          />
          <input
            required={required}
            type="checkbox"
            checked={option.correct}
            onChange={() => handleOptionCheck(index)}
          />
          <Button
            text="Remove"
            onClick={() => handleRemoveOption(index)}
            styles="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
          />
        </div>
      ))}

      <Button onClick={handleAddOption} text="Add Option" />
    </div>
  );
};

export default InputCheckBoxes;

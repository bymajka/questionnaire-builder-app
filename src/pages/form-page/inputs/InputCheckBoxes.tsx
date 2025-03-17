import { useState } from "react";
import { Option } from "../../../components/interfaces/QuizInterfaces";
import InputText from "./InputText";

interface InputCheckBoxesProps {
  onUpdate: (options: Option[]) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputCheckBoxes = ({ onUpdate, handleChange }: InputCheckBoxesProps) => {
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
      <InputText label="Question" handleChange={handleChange} />
      {options.map((option, index) => (
        <div key={option.id} className="flex items-center gap-2">
          <input
            type="text"
            value={option.optionText}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            placeholder={`Option ${index + 1}`}
            className="border p-1 rounded"
          />
          <input
            type="checkbox"
            checked={option.correct}
            onChange={() => handleOptionCheck(index)}
          />
          <button
            type="button"
            onClick={() => handleRemoveOption(index)}
            className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={handleAddOption}
        className="bg-blue-500 text-white px-2 py-1 rounded mt-2"
      >
        Add Option
      </button>
    </div>
  );
};

export default InputCheckBoxes;

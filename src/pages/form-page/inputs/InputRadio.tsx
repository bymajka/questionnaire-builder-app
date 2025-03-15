import InputText from "./InputText";
import { useState } from "react";
import Button from "../../../utils/Button";

interface Choice {
  id: number;
  choiceText: string;
}
const InputRadio = () => {
  const [choices, setChoices] = useState<Choice[]>([
    { id: Date.now(), choiceText: "" },
  ]);
  const addChoice = () => {
    const newChoice = { id: Date.now(), choiceText: "" };
    setChoices([...choices, newChoice]);
  };
  return (
    <div>
      <InputText label="Question" />
      {choices.map((choice) => (
        <InputText key={choice.id} label="Choice" />
      ))}
      <Button
        text="Add Choice"
        onClick={(e) => {
          e.preventDefault();
          addChoice();
        }}
      />
    </div>
  );
};

export default InputRadio;

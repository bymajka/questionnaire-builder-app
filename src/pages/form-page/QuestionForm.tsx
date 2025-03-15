import { useState } from "react";
import InputText from "./inputs/InputText";
import InputCheckBoxes from "./inputs/InputCheckBoxes";
import InputRadio from "./inputs/InputRadio";
import Button from "../../utils/Button";

const QuestionForm = ({
  id,
  onRemove,
}: {
  id: number;
  onRemove: (id: number) => void;
}) => {
  const [questionType, setQuestionType] = useState("text");
  return (
    <form>
      <div className="flex flex-row w-[600px] gap-2 items-center m-4">
        {questionType === "text" && <InputText label="Question" />}
        {questionType === "single choice" && <InputRadio />}
        {questionType === "multiple choices" && <InputCheckBoxes />}

        <div className="flex flex-col">
          <label htmlFor="type" className="font-bold">
            Type
          </label>
          <select
            name="type"
            onChange={(e) => setQuestionType(e.target.value)}
            className="border-2 h-10 rounded-md"
          >
            <option value="text">Text</option>
            <option value="single choice">Single choice</option>
            <option value="multiple choices">Multiple choices</option>
          </select>
        </div>

        <Button
          text="Remove"
          styles="bg-red-600 hover:bg-red-700 mt-6"
          onClick={() => {
            onRemove(id);
          }}
        />
      </div>
    </form>
  );
};

export default QuestionForm;

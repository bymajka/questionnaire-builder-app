import { useState } from "react";
import { Option, Question } from "../../data/QuizInterfaces";
import InputText from "./inputs/InputText";
import InputCheckBoxes from "./inputs/InputCheckBoxes";
import InputRadio from "./inputs/InputRadio";
import Button from "../../utils/Button";

interface QuestionFormProps {
  question: Question;
  onUpdate: (question: Question) => void;
  onRemove: (id: string) => void;
}

const QuestionForm = ({ question, onUpdate, onRemove }: QuestionFormProps) => {
  const [questionText, setQuestionText] = useState(question.questionText);
  const [questionType, setQuestionType] = useState(question.type);
  const [options, setOptions] = useState<Option[]>(question.options);

  const handleQuestionTextChange = (text: string) => {
    setQuestionText(text);
    onUpdate({
      id: question.id,
      questionText: text,
      type: questionType,
      options: questionType === "text" ? [] : options,
    });
  };

  const handleQuestionTypeChange = (type: string) => {
    setQuestionType(type);
    onUpdate({
      id: question.id,
      questionText,
      type,
      options: type === "text" ? [] : options,
    });
  };

  const handleOptionUpdate = (newOptions: Option[]) => {
    setOptions(newOptions);
    onUpdate({
      id: question.id,
      questionText,
      type: questionType,
      options: newOptions,
    });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div className="flex flex-row w-[600px] gap-2 items-center m-4">
        {questionType === "text" && (
          <InputText
            required
            id={`question-${question.id}`}
            label="Question"
            handleChange={(e) => {
              handleQuestionTextChange(e.target.value);
            }}
          />
        )}
        {questionType === "single-choice" && (
          <InputRadio
            required
            onUpdate={handleOptionUpdate}
            handleChange={(e) => handleQuestionTextChange(e.target.value)}
          />
        )}
        {questionType === "multiple-choices" && (
          <InputCheckBoxes
            required
            onUpdate={handleOptionUpdate}
            handleChange={(e) => handleQuestionTextChange(e.target.value)}
          />
        )}

        <div className="flex flex-col">
          <label htmlFor={`type-${question.id}`} className="font-bold">
            Type
          </label>
          <select
            value={questionType}
            id={`type-${question.id}`}
            onChange={(e) => handleQuestionTypeChange(e.target.value)}
            className="border-2 h-10 rounded-md"
          >
            <option value="text">Text</option>
            <option value="single-choice">Single choice</option>
            <option value="multiple-choices">Multiple choices</option>
          </select>
        </div>

        <Button
          text="Remove"
          styles="bg-red-600 hover:bg-red-700 mt-6"
          onClick={() => {
            onRemove(question.id);
          }}
        />
      </div>
    </form>
  );
};

export default QuestionForm;

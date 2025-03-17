import { useState } from "react";
import { Question } from "../../components/interfaces/QuizInterfaces";

interface QuestionFormProps {
  question: Question;
  onUpdate: (answer: string | string[]) => void;
}

const QuestionAnswersForm = ({ question, onUpdate }: QuestionFormProps) => {
  const [answer, setAnswer] = useState<string | string>("");

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAnswer(value);
    onUpdate(value);
  };

  const handleChoiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setAnswer((prevAnswer: any) => {
      const newAnswer = checked
        ? [...(prevAnswer || []), value]
        : prevAnswer.filter((item: string) => item !== value);
      onUpdate(newAnswer);
      return newAnswer;
    });
  };

  return (
    <div className="flex flex-col items-center">
      <h3 className="font-bold">{question.questionText}</h3>
      {question.type === "text" && (
        <input
          type="text"
          value={answer}
          className="placeholder:text-center text-center"
          onChange={handleTextChange}
          placeholder="Your answer"
        />
      )}

      {question.type === "multiple-choices" && question.options && (
        <div className="flex flex-row gap-4 items-center">
          {question.options.map((option) => (
            <label key={option.id}>
              <input
                type="checkbox"
                value={option.optionText}
                checked={
                  Array.isArray(answer) && answer.includes(option.optionText)
                }
                onChange={handleChoiceChange}
              />
              {option.optionText}
            </label>
          ))}
        </div>
      )}

      {question.type === "single-choice" && question.options && (
        <div className="flex flex-row gap-4 items-center">
          {question.options.map((option) => (
            <label key={option.id}>
              <input
                type="radio"
                name={question.id}
                value={option.optionText}
                checked={answer === option.optionText}
                onChange={handleTextChange}
              />
              {option.optionText}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuestionAnswersForm;

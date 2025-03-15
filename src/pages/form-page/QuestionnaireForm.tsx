import Button from "../../utils/Button";
import QuestionForm from "./QuestionForm";
import { useState } from "react";

const QuestionnaireForm = () => {
  const [questions, setQuestions] = useState<
    { id: number; questionText: string }[]
  >([]);

  const addQuestion = () => {
    const newQuestion = {
      id: Date.now(),
      questionText: "",
    };
    setQuestions([...questions, newQuestion]);
  };

  const removeQuestion = (id: number) => {
    setQuestions(questions.filter((question) => question.id !== id));
  };
  return (
    <>
      <div>
        {questions.map((question) => (
          <QuestionForm
            key={question.id}
            id={question.id}
            onRemove={removeQuestion}
          />
        ))}
      </div>
      <Button
        text="Add Question"
        onClick={() => {
          addQuestion();
        }}
        styles="m-4"
      />
    </>
  );
};

export default QuestionnaireForm;

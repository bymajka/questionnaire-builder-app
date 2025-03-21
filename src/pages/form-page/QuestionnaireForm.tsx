import Button from "../../utils/Button";
import QuestionForm from "./QuestionForm";
import { useState, useContext, useEffect } from "react";
import { QuizContext } from "../../context/QuizContext";
import InputText from "./inputs/InputText";
import { Question, Quiz } from "../../data/QuizInterfaces";
import { useNavigate, useParams } from "react-router";

const QuestionnaireForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const quizContext = useContext(QuizContext);
  const [quizTitle, setQuizTitle] = useState("");
  const [quizDescription, setQuizDescription] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchQuiz = async () => {
      if (id && quizContext) {
        const fetchedQuiz = await quizContext.getQuizById(id);
        if (fetchedQuiz) {
          setEditMode(true);
          setQuizTitle(fetchedQuiz.title || "");
          setQuizDescription(fetchedQuiz.description || "");
          setQuestions(fetchedQuiz.questions || []);
        }
      }
    };
    fetchQuiz();
  }, [editMode, id, quizContext]);

  const addQuestionForm = () => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      questionText: "",
      type: "text",
      options: [],
    };
    setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
  };

  const updateQuestion = (updatedQuestion: Question) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) =>
        q.id === updatedQuestion.id ? updatedQuestion : q
      )
    );
  };

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter((question) => question.id !== id));
  };
  const addQuizToDb = async () => {
    if (!quizTitle.trim()) {
      alert("Please provide a title for the quiz.");
      return;
    }

    if (questions.length === 0) {
      alert("Quiz must have at least one question.");
      return;
    } else if (questions.some((question) => !question.questionText.trim())) {
      alert("All questions must have a question text.");
      return;
    }

    if (
      questions.some(
        (q) =>
          (q.type === "single-choice" || q.type === "multiple-choices") &&
          q.options.length === 0
      ) ||
      questions.some(
        (q) =>
          (q.type === "single-choice" || q.type === "multiple-choices") &&
          q.options.some((option) => !option.optionText.trim())
      )
    ) {
      alert(
        "All single-choice and multiple-choice questions must have options with option text."
      );
      return;
    }

    const newQuiz: Quiz = {
      id: Date.now().toString(),
      title: quizTitle,
      description: quizDescription,
      questions: questions,
    };

    try {
      if (editMode && id) {
        await quizContext?.updateQuiz(id, newQuiz);
        alert("Quiz updated successfully!");
      } else {
        await quizContext?.addQuiz(newQuiz);
        alert("Quiz added successfully!");
      }
      navigate("/");
    } catch (error) {
      console.error("Error saving quiz:", error);
    }
  };

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    stateChanger: React.Dispatch<React.SetStateAction<string>>
  ) => {
    stateChanger(e.target.value);
  };

  return (
    <>
      <div className="w-1/3 m-4">
        <h2 className="text-2xl font-bold text-blue-800">
          {editMode ? "Edit Quiz" : "Create Quiz"}
        </h2>
        <InputText
          id="quiz-title"
          label="Quiz name"
          required
          handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleInput(e, setQuizTitle)
          }
        />
        <InputText
          id="quiz-description"
          label="Description"
          handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleInput(e, setQuizDescription)
          }
        />
      </div>
      <div>
        {questions.map((question) => (
          <QuestionForm
            key={question.id}
            question={question}
            onRemove={removeQuestion}
            onUpdate={updateQuestion}
          />
        ))}
      </div>
      <Button
        text="Add Question"
        onClick={() => {
          addQuestionForm();
        }}
        styles="m-4"
      />

      <Button
        text={`${editMode ? "Update" : "Create"} Quiz`}
        onClick={() => {
          addQuizToDb();
        }}
      />
    </>
  );
};

export default QuestionnaireForm;

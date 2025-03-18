import { useState, useEffect, useContext } from "react";
import { QuizContext } from "../../context/QuizContext";
import { useNavigate, useParams } from "react-router";
import { Quiz } from "../../data/QuizInterfaces";
import { saveResponse } from "../../utils/Responses";
import Button from "../../utils/Button";
import QuestionAnswersForm from "./QuestionAnswersForm";

const QuestionnairePage = () => {
  const { id } = useParams<{ id: string }>();
  const quizContext = useContext(QuizContext);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [responses, setResponses] = useState<{
    [key: string]: string | string[];
  }>({});
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizQuestions = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const quiz = await quizContext?.getQuizById(id);
        if (quiz) setQuiz(quiz);
      } catch (error) {
        console.error("Failed to fetch questions for quiz:", error);
        setQuiz(null);
      } finally {
        setLoading(false);
      }
    };
    fetchQuizQuestions();
  }, [id, quizContext]);

  const handleAnswerChange = (id: string, answer: string | string[]) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [id]: answer,
    }));
  };

  const startQuiz = () => {
    setStartTime(Date.now());
  };

  const submitQuiz = async () => {
    setEndTime(Date.now());
    await saveResponse(quiz?.id, responses);
  };

  if (loading) {
    return <div>Loading questions...</div>;
  }

  return (
    <div className="flex flex-col mx-10 gap-2 my-5 items-center">
      <h2 className="text-center font-bold text-2xl text-blue-800">
        Questionnaire
      </h2>
      {!startTime ? (
        <Button text="Run" onClick={startQuiz} styles="w-1/4 mx-auto" />
      ) : (
        <>
          <div className="flex flex-col gap-2">
            {quiz?.questions?.map((question) => (
              <QuestionAnswersForm
                key={question.id}
                question={question}
                onUpdate={(answer: string | string[]) =>
                  handleAnswerChange(question.id, answer)
                }
              />
            ))}
            <Button
              text="Submit"
              styles="self-center mx-auto"
              onClick={() => {
                submitQuiz();
                setTimeout(() => {
                  navigate("/");
                }, 5000);
              }}
            />
          </div>
          <div className="mx-auto">
            {endTime && startTime && (
              <p>
                Time taken: {((endTime - startTime) / 1000).toFixed(2)} seconds.
              </p>
            )}
            <div>
              <h3>Your Answers:</h3>
              {Object.entries(responses).map(([key, value]) => (
                <div className="flex flex-row gap-2" key={key}>
                  <strong>
                    {quiz?.questions?.find((q) => q.id === key)?.questionText}:
                  </strong>
                  <p>{Array.isArray(value) ? value.join(", ") : value}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default QuestionnairePage;

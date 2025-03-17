import { useContext, useEffect, useState } from "react";
import { QuizContext } from "../../context/QuizContext";
import QuizCard from "./QuizCard";
import Button from "../../utils/Button";
import { NavLink } from "react-router";
import { countResponsesForQuiz } from "../../utils/Responses";

const Home = () => {
  const quizContext = useContext(QuizContext);
  const [responsesCount, setResponsesCount] = useState<Record<string, number>>(
    {}
  );
  if (!quizContext) return null;
  const quizes = quizContext.quizzes;

  useEffect(() => {
    const fetchResponsesCount = async () => {
      const counts: Record<string, number> = {};
      for (const quiz of quizes) {
        const count = await countResponsesForQuiz(quiz.id.toString());
        counts[quiz.id.toString()] = count;
      }
      setResponsesCount(counts);
    };

    fetchResponsesCount();
  }, [quizes]);

  return (
    <div>
      <h1 className="p-6 text-2xl">Quiz Catalog</h1>
      <NavLink to="/create-quiz">
        <Button
          text="Create a new quiz"
          onClick={() => {}}
          styles="absolute right-6 top-6"
        />
      </NavLink>
      <div className="grid grid-cols-3 gap-4 place-items-center">
        {quizes?.map((quiz) => (
          <QuizCard
            key={quiz.title}
            id={quiz.id.toString()}
            title={quiz.title}
            description={quiz.description}
            questions={quiz.questions}
            responses={responsesCount[quiz.id.toString()] || 0}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;

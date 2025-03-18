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
  const quizzes = quizContext.quizzes;
  const [pages, setPages] = useState(1);

  useEffect(() => {
    if (!quizzes?.length) return;
    const fetchResponsesCount = async () => {
      const counts = await Promise.all(
        quizzes.map(async (quiz) => ({
          id: quiz.id,
          count: await countResponsesForQuiz(quiz.id.toString()),
        }))
      );
      setResponsesCount(
        Object.fromEntries(counts.map(({ id, count }) => [id, count]))
      );
    };
    fetchResponsesCount();
  }, [quizzes]);

  return (
    <div className="flex flex-col">
      <h1 className="p-6 text-2xl">Quiz Catalog</h1>
      <NavLink to="/create-quiz">
        <Button
          text="Create a new quiz"
          onClick={() => {}}
          styles="absolute right-6 top-6"
        />
      </NavLink>
      <div className="grid grid-cols-3 gap-4 place-items-center">
        {quizzes?.slice(9 * (pages - 1), 9 * pages).map((quiz) => (
          <QuizCard
            key={quiz.id}
            {...quiz}
            responses={responsesCount[quiz.id] || 0}
          />
        ))}
      </div>
      {(quizzes?.length === 0 && (
        <h2 className="text-2xl">No quizzes found</h2>
      )) || (
        <h2 className="text-2xl text-center">
          {pages} / {quizzes && Math.ceil(quizzes.length / 9)}
        </h2>
      )}
      <div className="flex flex-row mx-auto">
        <Button
          styles={`${pages > 1 ? "" : "hidden"}`}
          text="Previous"
          onClick={() => setPages(pages - 1)}
        />
        <Button
          styles={`${
            quizzes && pages < Math.ceil(quizzes.length / 9) ? "" : "hidden"
          }`}
          text="Next"
          onClick={() => setPages(pages + 1)}
        />
      </div>
    </div>
  );
};

export default Home;

import { useContext, useEffect, useState } from "react";
import { QuizContext } from "../../context/QuizContext";
import QuizCard from "./QuizCard";
import Button from "../../utils/Button";
import { NavLink } from "react-router";
import { countResponsesForQuiz } from "../../utils/Responses";
import { Quiz } from "../../data/QuizInterfaces";
import Filter from "../../utils/Filter";

const Home = () => {
  const quizContext = useContext(QuizContext);
  const [responsesCount, setResponsesCount] = useState<Record<string, number>>(
    {}
  );
  if (!quizContext) return null;
  const quizzes = quizContext.quizzes;
  const [pages, setPages] = useState(1);
  const [filteredQuizzes, setFilteredQuizzes] = useState<Quiz[] | undefined>(
    []
  );
  const [filterParams, setFilterParams] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!quizzes?.length) return;
    const fetchResponsesCount = async () => {
      const counts = await Promise.all(
        quizzes.map(async (quiz) => ({
          id: quiz.id,
          count: await countResponsesForQuiz(quiz.id.toString()),
        }))
      );
      setFilteredQuizzes(quizzes);
      setResponsesCount(
        Object.fromEntries(counts.map(({ id, count }) => [id, count]))
      );
    };
    fetchResponsesCount();
  }, [quizzes]);

  useEffect(() => {
    if (!quizzes?.length) return;
    setFilteredQuizzes(Filter({ quizzes, filterParams }));
    setPages(1);
  }, [quizzes, filterParams]);

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
      <div className="flex flex-row mx-auto gap-3 mb-3">
        <input
          type="text"
          id="title-filter"
          className="border-2 p-2 rounded-md"
          onChange={(e) => {
            setFilterParams({ ...filterParams, title: e.target.value });
          }}
          placeholder="Filter by title"
        />
        <input
          type="text"
          id="title-filter"
          onChange={(e) => {
            setFilterParams({ ...filterParams, description: e.target.value });
          }}
          className="border-2 p-2 rounded-md"
          placeholder="Filter by description"
        />
        <input
          type="text"
          id="title-filter"
          onChange={(e) => {
            setFilterParams({ ...filterParams, questions: e.target.value });
          }}
          className="border-2 p-2 rounded-md"
          placeholder="Filter by questions count"
        />
      </div>
      <div className="grid grid-cols-3 gap-4 place-items-center">
        {filteredQuizzes?.slice(9 * (pages - 1), 9 * pages).map((quiz) => (
          <QuizCard
            key={quiz.id}
            {...quiz}
            responses={responsesCount[quiz.id] || 0}
          />
        ))}
      </div>
      {(filteredQuizzes?.length === 0 && (
        <h2 className="text-2xl text-indigo-950 absolute top-1/2 left-1/2 transform -translate-x-1/2">
          No quizzes found
        </h2>
      )) || (
        <h2 className="text-2xl text-center">
          {pages} / {filteredQuizzes && Math.ceil(filteredQuizzes.length / 9)}
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
            filteredQuizzes && pages < Math.ceil(filteredQuizzes.length / 9)
              ? ""
              : "hidden"
          }`}
          text="Next"
          onClick={() => setPages(pages + 1)}
        />
      </div>
    </div>
  );
};

export default Home;

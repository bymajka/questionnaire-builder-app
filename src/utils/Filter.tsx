import { Quiz } from "../data/QuizInterfaces";

interface FilterParams {
  quizzes: Quiz[] | undefined;
  filterParams: Record<string, string>;
}

const Filter = ({ quizzes, filterParams }: FilterParams) => {
  if (!quizzes) return [];

  return quizzes.filter((quiz) => {
    return Object.entries(filterParams).every(([key, value]) => {
      if (!value) return true;

      if (key === "questions") {
        const questionsCount = parseInt(value);
        return quiz.questions?.length === questionsCount;
      }

      if (typeof quiz[key as keyof Quiz] === "string") {
        return (quiz[key as keyof Quiz] as string)
          .toLowerCase()
          .includes(value.toLowerCase());
      }

      return true;
    });
  });
};

export default Filter;

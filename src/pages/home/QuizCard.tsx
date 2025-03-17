import { Question } from "../../components/interfaces/QuizInterfaces";
import MenuButton from "../../utils/MenuButton";

const operations = ["Run", "Edit", "Delete"];
interface Quiz {
  id: string;
  title?: string;
  description?: string;
  questions?: Question[];
  responses?: number;
}

const QuizCard = ({ id, title, description, questions, responses }: Quiz) => {
  return (
    <div className="border-1 relative w-96 h-52 p-4">
      <h2 className="text-2xl mb-2">{title}</h2>
      <p>{description}</p>
      <p className="absolute bottom-2 text-indigo-700">
        Questions: {questions?.length}
      </p>
      <p className="absolute text-indigo-700 right-6 bottom-2">
        Completions: {responses}
      </p>
      <MenuButton options={operations} id={id} />
    </div>
  );
};

export default QuizCard;

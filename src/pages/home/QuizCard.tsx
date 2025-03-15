import MenuButton from "../../utils/MenuButton";

const operations = ["Run", "Edit", "Delete"];
interface Quiz {
  id: string;
  title?: string;
  description?: string;
  questions?: [];
}

const QuizCard = ({ id, title, description, questions }: Quiz) => {
  return (
    <div className="border-1 relative w-96 h-52 p-4">
      <h2 className="text-2xl mb-2">{title}</h2>
      <p>{description}</p>
      <p className="absolute bottom-2 text-indigo-700">{questions?.length}</p>
      <MenuButton options={operations} />
    </div>
  );
};

export default QuizCard;

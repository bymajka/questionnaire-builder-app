import { useState, useEffect } from "react";
import QuizCard from "./QuizCard";
import Button from "../../utils/Button";
import { NavLink } from "react-router";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config";

interface Quiz {
  id: string;
  title?: string;
  description?: string;
  questions?: [];
}

// const initialQuizes: Quiz[] = [
//   {
//     name: "Math Quiz",
//     description: "A quiz about basic math concepts",
//     questions: 10,
//   },
//   {
//     name: "Science Quiz",
//     description: "A quiz about general science knowledge",
//     questions: 15,
//   },
//   {
//     name: "History Quiz",
//     description: "A quiz about historical events",
//     questions: 12,
//   },
//   {
//     name: "Geography Quiz",
//     description: "A quiz about world geography",
//     questions: 8,
//   },
//   {
//     name: "Literature Quiz",
//     description: "A quiz about famous literature works",
//     questions: 9,
//   },
//   {
//     name: "Music Quiz",
//     description: "A quiz about music theory",
//     questions: 11,
//   },
// ];

const Home = () => {
  // const [quizes, setQuizes] = useState<Quiz[]>(initialQuizes);
  const quizesRef = collection(db, "quizzes");
  const [quizes, setQuizes] = useState<Quiz[]>([]);

  useEffect(() => {
    const fetchQuizes = async () => {
      try {
        const data = await getDocs(quizesRef);
        if (data.empty) {
          console.warn("No quizzes found.");
          setQuizes([]);
          return;
        }
        setQuizes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } catch (error) {
        console.error("Error fetching quizzes:", error);
        setQuizes([]);
      }
    };

    fetchQuizes();
  }, []);

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
        {quizes.map((quiz) => (
          <QuizCard
            key={quiz.title}
            id={quiz.id}
            title={quiz.title}
            description={quiz.description}
            questions={quiz.questions}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;

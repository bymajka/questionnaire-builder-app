import { createContext, useEffect, useState } from "react";
import { db } from "../firebase-config";
import { Quiz, Question } from "../components/interfaces/QuizInterfaces";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

interface QuizContextType {
  quizzes: Quiz[] | null;
  addQuiz: (quiz: Quiz) => Promise<void>;
  deleteQuiz: (id: string) => Promise<void>;
  updateQuiz: (id: string, quiz: Quiz) => Promise<void>;
  getQuizById: (id: string) => Promise<Quiz | null>;
}

export const QuizContext = createContext<QuizContextType | null>(null);

export interface QuizProviderProps {
  children: React.ReactNode;
}

export const QuizProvider = ({ children }: QuizProviderProps) => {
  const quizesRef = collection(db, "quizzes");
  const [quizzes, setQuizes] = useState<Quiz[]>([]);

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

  useEffect(() => {
    fetchQuizes();
  }, []);
  const addQuiz = async (quiz: Quiz) => {
    try {
      await addDoc(quizesRef, quiz);
      fetchQuizes();
    } catch (error) {
      console.error("Error adding quiz:", error);
    }
  };
  const deleteQuiz = async (id: string) => {
    try {
      await deleteDoc(doc(db, "quizzes", id));
      fetchQuizes();
    } catch (error) {
      console.error("Error deleting quiz:", error);
    }
  };
  const updateQuiz = async (id: string, quiz: Quiz) => {
    try {
      const itemRef = doc(db, "quizzes", id);
      await updateDoc(itemRef, { ...quiz });
      fetchQuizes();
      console.log("item updated");
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const getQuizById: (id: string) => Promise<Quiz | null> = async (
    id: string
  ) => {
    try {
      const docRef = doc(db, "quizzes", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          title: data.title,
          description: data.description,
          questions: data.questions || [],
        };
      } else {
        console.log("No such document!");
        return null;
      }
    } catch (error) {
      console.error("Error getting document:", error);
      return null;
    }
  };

  return (
    <QuizContext.Provider
      value={{ quizzes, addQuiz, deleteQuiz, updateQuiz, getQuizById }}
    >
      {children}
    </QuizContext.Provider>
  );
};

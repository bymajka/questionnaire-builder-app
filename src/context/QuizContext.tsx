import { createContext, useEffect, useState } from "react";
import {
  collection,
  getDoc,
  addDoc,
  deleteDoc,
  onSnapshot,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase-config";
import { Quiz } from "../data/QuizInterfaces";

export interface QuizContextType {
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
  const quizzesRef = collection(db, "quizzes");
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  useEffect(() => {
    onSnapshot(quizzesRef, (snapshot) => {
      setQuizzes(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  }, []);

  const addQuiz = async (quiz: Quiz) => {
    try {
      await addDoc(quizzesRef, quiz);
    } catch (error) {
      console.error("Error adding quiz:", error);
    }
  };

  const deleteQuiz = async (id: string) => {
    try {
      await deleteDoc(doc(db, "quizzes", id));
    } catch (error) {
      console.error("Error deleting quiz:", error);
    }
  };

  const updateQuiz = async (id: string, quiz: Quiz) => {
    try {
      const quizRef = doc(db, "quizzes", id);
      await updateDoc(quizRef, { ...quiz });
    } catch (error) {
      console.error("Error updating quiz:", error);
    }
  };

  const getQuizById = async (id: string): Promise<Quiz | null> => {
    try {
      const quizRef = doc(db, "quizzes", id);
      const docSnap = await getDoc(quizRef);
      if (docSnap.exists()) {
        return { ...docSnap.data(), id: docSnap.id };
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error getting quiz:", error);
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

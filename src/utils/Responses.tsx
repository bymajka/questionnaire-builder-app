import { db } from "../firebase-config";
import {
  collection,
  addDoc,
  Timestamp,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export const saveResponse = async (
  quizId: string | undefined,
  responses: Record<string, any>
): Promise<void> => {
  try {
    const docRef = await addDoc(collection(db, "responses"), {
      quizId,
      timestamp: Timestamp.now(),
      responses,
    });
    console.log("Response saved with ID: ", docRef.id);
  } catch (error) {
    console.error("Error saving response: ", error);
  }
};

export const countResponsesForQuiz = async (
  quizId: string
): Promise<number> => {
  try {
    const responsesCollection = collection(db, "responses");
    const q = query(responsesCollection, where("quizId", "==", quizId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.size;
  } catch (error) {
    console.error("Error counting responses: ", error);
    return 0;
  }
};

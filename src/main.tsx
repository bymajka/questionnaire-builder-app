import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { QuizProvider } from "./context/QuizContext";
import "./index.css";
import Home from "./pages/home/Home";
import QuestionnaireForm from "./pages/form-page/QuestionnaireForm";
import QuestionnairePage from "./pages/questionnaire-page/QuestionnairePage";

const root = document.getElementById("root")!;

createRoot(root).render(
  <StrictMode>
    <QuizProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="create-quiz" element={<QuestionnaireForm />} />
          <Route path="run-quiz/:id" element={<QuestionnairePage />} />
          <Route path="edit-quiz/:id" element={<QuestionnaireForm />} />
        </Routes>
      </BrowserRouter>
    </QuizProvider>
  </StrictMode>
);

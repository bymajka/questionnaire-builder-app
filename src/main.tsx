import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import Home from "./pages/home/Home";
import QuestionnaireForm from "./pages/form-page/QuestionnaireForm";

const root = document.getElementById("root")!;

createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="create-quiz" element={<QuestionnaireForm />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

import { useState, useContext, useEffect, useRef } from "react";
import { QuizContext } from "../context/QuizContext";
import { useNavigate } from "react-router";

const MenuButton = ({ options, id }: { options: string[]; id: string }) => {
  const [open, setOpen] = useState(false);
  const quizContext = useContext(QuizContext);
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="absolute right-2 top-2" ref={menuRef}>
      <button
        id="dropdownMenuIconButton"
        data-dropdown-toggle="dropdownDots"
        className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        type="button"
        onClick={() => setOpen(!open)}
      >
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 4 15"
        >
          <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
        </svg>
      </button>

      <div
        id="dropdownDots"
        className={`z-10 ${
          open ? "block" : "hidden"
        } bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600 absolute right-0`}
      >
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownMenuIconButton"
        >
          {options.map((option) => {
            if (option === "Delete") {
              return (
                <li key={option}>
                  <button
                    onClick={() => {
                      quizContext?.deleteQuiz(id);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    {option}
                  </button>
                </li>
              );
            } else if (option === "Run") {
              return (
                <li key={option}>
                  <button
                    onClick={() => {
                      navigate(`/run-quiz/${id}`);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    {option}
                  </button>
                </li>
              );
            } else if (option === "Edit") {
              return (
                <li key={option}>
                  <button
                    onClick={() => {
                      navigate(`/edit-quiz/${id}`);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    {option}
                  </button>
                </li>
              );
            }
            return (
              <li key={option}>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  {option}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default MenuButton;

const Button = ({
  text,
  onClick,
  styles,
}: {
  text: string;
  onClick: (e: React.MouseEvent) => void;
  styles?: string;
}) => {
  return (
    <button
      className={`bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded ${styles}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;

interface AuthButtonProps {
  text: string;
  isLoading: boolean;
  onClick: () => void;
}

export default function AuthButton({
  text,
  isLoading,
  onClick,
}: AuthButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium py-2.5 rounded-lg transition-colors text-sm"
    >
      {isLoading ? "Loading..." : text}
    </button>
  );
}

export default function Spinner({ message = 'Loading...' }) {
  return (
    <div className="flex items-center justify-center min-h-screen text-gray-300">
      <svg
        className="animate-spin h-6 w-6 mr-3 text-blue-500"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        ></path>
      </svg>
      <p className="text-sm">{message}</p>
    </div>
  );
}

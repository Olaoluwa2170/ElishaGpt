
export const TypingIndicator = () => {
  return (
    <div className="flex items-center gap-2 bg-gray-200 p-2 self-start rounded-xl">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="w-2 h-2 bg-black rounded-full animate-bounce"
          style={{ animationDelay: `${index * 0.2}s` }}
        ></div>
      ))}
    </div>
  );
}

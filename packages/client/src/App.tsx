import ChatBox from "./components/chat/ChatBox";

function App() {
  return (
    <div>
      <nav className="flex justify-between items-center p-4 border-b border-gray-300 mb-8 sticky top-0 bg-white">
        <h1 className="text-2xl font-bold">Elisha GPT</h1>
      </nav>
      <div className="max-w-[80vw] mx-auto h-[80vh]">
        <ChatBox />
      </div>
    </div>
  )


}

export default App

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Index from "@/pages/Index"
import Landing from "@/pages/Landing"
import TodoList from "@/pages/TodoList"
import "./App.css"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/simulator" element={<Index />} />
        <Route path="/todo" element={<TodoList />} />
      </Routes>
    </Router>
  )
}

export default App
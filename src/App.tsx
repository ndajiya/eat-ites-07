import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Index from "@/pages/Index"
import Landing from "@/pages/Landing"
import TodoList from "@/pages/TodoList"
import Merit from "@/pages/Merit"
import Considerations from "@/pages/Considerations"
import "./App.css"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/simulator" element={<Index />} />
        <Route path="/todo" element={<TodoList />} />
        <Route path="/merit" element={<Merit />} />
        <Route path="/considerations" element={<Considerations />} />
      </Routes>
    </Router>
  )
}

export default App
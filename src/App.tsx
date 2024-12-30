import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import Landing from "@/pages/Landing";
import Merit from "@/pages/Merit";
import Considerations from "@/pages/Considerations";
import TodoList from "@/pages/TodoList";
import { Documentation } from "@/pages/Documentation";
import Index from "@/pages/Index";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/merit" element={<Merit />} />
          <Route path="/considerations" element={<Considerations />} />
          <Route path="/todo" element={<TodoList />} />
          <Route path="/docs" element={<Documentation />} />
          <Route path="/simulator" element={<Index />} />
        </Routes>
      </Router>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import Landing from "@/pages/Landing";
import Merit from "@/pages/Merit";
import Considerations from "@/pages/Considerations";
import TodoList from "@/pages/TodoList";
import { Documentation } from "@/pages/Documentation";
import Associates from "@/pages/Associates";
import MoneyAndBanking from "@/pages/MoneyAndBanking";
import Bachelors from "@/pages/Bachelors";
import PricingPage from "@/pages/Pricing";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/associates" element={<Associates />} />
          <Route path="/merit" element={<Merit />} />
          <Route path="/considerations" element={<Considerations />} />
          <Route path="/todo" element={<TodoList />} />
          <Route path="/docs" element={<Documentation />} />
          <Route path="/money-and-banking" element={<MoneyAndBanking />} />
          <Route path="/bachelors" element={<Bachelors />} />
          <Route path="/pricing" element={<PricingPage />} />
        </Routes>
      </Router>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
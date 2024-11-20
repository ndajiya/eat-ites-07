import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "Business and Financial Cycles", completed: false }
  ]);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo.trim(), completed: false }]);
      setNewTodo("");
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <Link to="/" className="block text-center mb-8 hover:opacity-80 transition-opacity">
        <h1 className="text-3xl font-bold tracking-tight">Economic Simulator</h1>
      </Link>
      <Card>
        <CardHeader>
          <CardTitle>To Do List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            <Input
              placeholder="Add a new todo"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addTodo()}
            />
            <Button onClick={addTodo}>Add</Button>
          </div>
          <div className="space-y-2">
            {todos.map((todo) => (
              <div key={todo.id} className="flex items-center gap-2 p-2 rounded hover:bg-accent">
                <Checkbox
                  checked={todo.completed}
                  onCheckedChange={() => toggleTodo(todo.id)}
                />
                <span className={todo.completed ? "line-through text-muted-foreground" : ""}>
                  {todo.text}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TodoList;
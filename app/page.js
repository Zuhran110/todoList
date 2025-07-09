"use client";
import React, { useState, useEffect } from "react";

const TodoList = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all"); // all, active, completed

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem("todoTasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("todoTasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (editingId !== null) {
      // Update existing task
      setTasks(tasks.map(task => 
        task.id === editingId 
          ? { ...task, title: title.trim(), desc: desc.trim() }
          : task
      ));
      setEditingId(null);
    } else {
      // Add new task
      const newTask = {
        id: Date.now(),
        title: title.trim(),
        desc: desc.trim(),
        completed: false,
        createdAt: new Date().toISOString(),
      };
      setTasks([...tasks, newTask]);
    }
    
    setTitle("");
    setDesc("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => 
      task.id === id 
        ? { ...task, completed: !task.completed }
        : task
    ));
  };

  const startEditing = (task) => {
    setEditingId(task.id);
    setTitle(task.title);
    setDesc(task.desc);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setTitle("");
    setDesc("");
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.desc.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === "active") return !task.completed && matchesSearch;
    if (filter === "completed") return task.completed && matchesSearch;
    return matchesSearch;
  });

  const completedCount = tasks.filter(task => task.completed).length;
  const activeCount = tasks.length - completedCount;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-2">
            ✨ Todo List
          </h1>
          <p className="text-gray-600 text-lg">
            Stay organized and boost your productivity
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-blue-600">{tasks.length}</div>
            <div className="text-gray-600">Total Tasks</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-green-600">{activeCount}</div>
            <div className="text-gray-600">Active</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-purple-600">{completedCount}</div>
            <div className="text-gray-600">Completed</div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter your task..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Description (optional)"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                {editingId !== null ? "Update Task" : "Add Task"}
              </button>
              {editingId !== null && (
                <button
                  type="button"
                  onClick={cancelEditing}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Tasks</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Tasks List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                {tasks.length === 0 ? "No tasks yet" : "No tasks match your search"}
              </h3>
              <p className="text-gray-500">
                {tasks.length === 0 
                  ? "Add your first task to get started!" 
                  : "Try adjusting your search or filter criteria"
                }
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className={`p-4 rounded-lg border transition-all duration-200 ${
                    task.completed
                      ? "bg-gray-50 border-gray-200"
                      : "bg-white border-gray-200 hover:border-blue-300"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <button
                      onClick={() => toggleComplete(task.id)}
                      className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                        task.completed
                          ? "bg-green-500 border-green-500 text-white"
                          : "border-gray-300 hover:border-green-500"
                      }`}
                    >
                      {task.completed && "✓"}
                    </button>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-semibold text-lg ${
                        task.completed ? "line-through text-gray-500" : "text-gray-800"
                      }`}>
                        {task.title}
                      </h3>
                      {task.desc && (
                        <p className={`mt-1 ${
                          task.completed ? "text-gray-400" : "text-gray-600"
                        }`}>
                          {task.desc}
                        </p>
                      )}
                      <p className="text-xs text-gray-400 mt-2">
                        Created: {new Date(task.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEditing(task)}
                        className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoList;

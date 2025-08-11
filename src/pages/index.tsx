import React, { useState, useEffect } from 'react';
import { Check, X, Plus, ListTodo, Moon, Sun } from 'lucide-react';
import Header from './Component/header';
import Footer from './Component/footer';
import { getFromStorage, setToStorage, initializeStorage, storageAvailable } from '../utils/localStorage';

// TypeScript interfaces
interface Task {
  id: number;
  name: string;
  description: string;
  completed: boolean;
  createdAt: Date;
}

interface AddTaskFormProps {
  onAddTask: (task: Task) => void;
}

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: number) => void;
  onDelete: (id: number) => void;
}

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (id: number) => void;
  onDelete: (id: number) => void;
}

interface StatisticsProps {
  tasks: Task[];
}





// AddTaskForm Component
const AddTaskForm: React.FC<AddTaskFormProps> = ({ onAddTask }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!name.trim()) {
      setError('Task name is required');
      return;
    }
    
    if (name.trim().length > 50) {
      setError('Task name must be less than 50 characters');
      return;
    }

    onAddTask({
      id: Date.now(),
      name: name.trim(),
      description: description.trim(),
      completed: false,
      createdAt: new Date()
    });

    setName('');
    setDescription('');
    setError('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="task-name" className="sr-only">Task Name</label>
          <input
            id="task-name"
            type="text"
            placeholder="Task name"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setName(e.target.value);
              setError('');
            }}
            onKeyPress={handleKeyPress}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
            aria-label="Task name"
          />
        </div>
        <div>
          <label htmlFor="task-description" className="sr-only">Task Description</label>
          <input
            id="task-description"
            type="text"
            placeholder="Description (optional)"
            value={description}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
            aria-label="Task description"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2"
        >
          <Plus size={20} />
          <span>Add Todo</span>
        </button>
      </div>
      {error && (
        <p className="text-red-500 text-sm mt-2" role="alert">{error}</p>
      )}
    </div>
  );
};

// TaskItem Component
const TaskItem: React.FC<TaskItemProps> = ({ task, onToggleComplete, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      onDelete(task.id);
    }, 300);
  };

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-3 transition-all duration-300 ${
        isDeleting ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'
      } ${task.completed ? 'opacity-75' : ''}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1">
          <button
            onClick={() => onToggleComplete(task.id)}
            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
              task.completed
                ? 'bg-green-500 border-green-500'
                : 'border-gray-300 dark:border-gray-600 hover:border-purple-500'
            }`}
            aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
          >
            {task.completed && <Check size={16} className="text-white" />}
          </button>
          <div className="flex-1">
            <h3 className={`font-semibold text-gray-800 dark:text-white ${
              task.completed ? 'line-through text-gray-500 dark:text-gray-400' : ''
            }`}>
              {task.name}
            </h3>
            {task.description && (
              <p className={`text-sm text-gray-600 dark:text-gray-400 mt-1 ${
                task.completed ? 'line-through' : ''
              }`}>
                {task.description}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {task.completed && (
            <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs font-medium px-2.5 py-0.5 rounded">
              Complete
            </span>
          )}
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
            aria-label="Delete task"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

// TaskList Component
const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleComplete, onDelete }) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <ListTodo size={64} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
        <p className="text-gray-500 dark:text-gray-400 text-lg">No tasks yet. Add one above!</p>
      </div>
    );
  }

  const activeTasks = tasks.filter((task: Task) => !task.completed);
  const completedTasks = tasks.filter((task: Task) => task.completed);

  return (
    <div>
      {activeTasks.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Active ({activeTasks.length})
          </h2>
          {activeTasks.map((task: Task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggleComplete={onToggleComplete}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
      
      {completedTasks.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Completed ({completedTasks.length})
          </h2>
          {completedTasks.map((task: Task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggleComplete={onToggleComplete}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Statistics Component
const Statistics: React.FC<StatisticsProps> = ({ tasks }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task: Task) => task.completed).length;
  const activeTasks = totalTasks - completedTasks;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Statistics</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{totalTasks}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Tasks</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{activeTasks}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Active</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">{completedTasks}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold text-pink-600 dark:text-pink-400">{completionRate}%</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Done</p>
        </div>
      </div>
    </div>
  );
};

// Main App Component
export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const [isStorageAvailable, setIsStorageAvailable] = useState(true); // Default to true to prevent hydration mismatch
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize storage and load data on component mount
  useEffect(() => {
    initializeStorage();
    // Check storage availability on client side
    setIsStorageAvailable(storageAvailable());
    
    // Load data from storage
    const savedTasks = getFromStorage('tasks', []);
    const savedDarkMode = getFromStorage('darkMode', false);
    
    setTasks(savedTasks);
    setDarkMode(savedDarkMode);
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    // Save tasks to localStorage whenever they change (only after initialization)
    if (isInitialized) {
      setToStorage('tasks', tasks);
    }
  }, [tasks, isInitialized]);

  useEffect(() => {
    // Apply dark mode class to document (only after initialization)
    if (isInitialized) {
      if (darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      // Save preference
      setToStorage('darkMode', darkMode);
    }
  }, [darkMode, isInitialized]);

  const addTask = (task: Task) => {
    setTasks([task, ...tasks]);
  };

  const toggleComplete = (id: number) => {
    setTasks(tasks.map((task: Task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task: Task) => task.id !== id));
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {!isStorageAvailable && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                    Storage Not Available
                  </h3>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                    Your data will not be saved between sessions. Please enable cookies or use a different browser.
                  </p>
                </div>
              </div>
            </div>
          )}
          <AddTaskForm onAddTask={addTask} />
          <Statistics tasks={tasks} />
          <TaskList
            tasks={tasks}
            onToggleComplete={toggleComplete}
            onDelete={deleteTask}
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
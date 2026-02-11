import useTasks from './hooks/useTasks';
import useFilter from './hooks/useFilter';
import TaskForm from './components/TaskForm';
import TaskFilter from './components/TaskFilter';
import TaskList from './components/TaskList';

function App() {
  const { tasks, addTask, toggleTask, deleteTask, clearCompleted } = useTasks();
  const { filter, setFilter } = useFilter();

  const activeCount = tasks.filter((t) => !t.completed).length;
  const completedCount = tasks.filter((t) => t.completed).length;

  const filteredTasks =
    filter === 'active'
      ? tasks.filter((t) => !t.completed)
      : filter === 'completed'
        ? tasks.filter((t) => t.completed)
        : tasks;

  const emptyMessage =
    tasks.length === 0
      ? 'No tasks yet. Add one above!'
      : filter === 'active'
        ? 'No active tasks.'
        : filter === 'completed'
          ? 'No completed tasks.'
          : 'No tasks yet. Add one above!';

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Task Manager
        </h1>
        <div className="space-y-6">
          <TaskForm onAddTask={addTask} />
          {tasks.length > 0 && (
            <TaskFilter
              filter={filter}
              onFilterChange={setFilter}
              activeCount={activeCount}
              completedCount={completedCount}
              onClearCompleted={clearCompleted}
            />
          )}
          <TaskList
            tasks={filteredTasks}
            onToggle={toggleTask}
            onDelete={deleteTask}
            emptyMessage={emptyMessage}
          />
        </div>
      </div>
    </div>
  );
}

export default App;

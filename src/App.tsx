import useTasks from './hooks/useTasks';
import useFilter from './hooks/useFilter';
import useCategoryFilter from './hooks/useCategoryFilter';
import TaskForm from './components/TaskForm';
import TaskFilter from './components/TaskFilter';
import CategoryFilter from './components/CategoryFilter';
import TaskList from './components/TaskList';

function App() {
  const { tasks, addTask, toggleTask, deleteTask, clearCompleted } = useTasks();
  const { filter, setFilter } = useFilter();
  const { categoryFilter, setCategoryFilter } = useCategoryFilter();

  const activeCount = tasks.filter((t) => !t.completed).length;
  const completedCount = tasks.filter((t) => t.completed).length;

  const filteredTasks = tasks
    .filter((t) =>
      filter === 'active'
        ? !t.completed
        : filter === 'completed'
          ? t.completed
          : true
    )
    .filter((t) =>
      categoryFilter === 'all' ? true : t.category === categoryFilter
    );

  const hasActiveFilters = filter !== 'all' || categoryFilter !== 'all';

  const emptyMessage =
    tasks.length === 0
      ? 'No tasks yet. Add one above!'
      : hasActiveFilters
        ? 'No tasks match the current filters.'
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
            <>
              <TaskFilter
                filter={filter}
                onFilterChange={setFilter}
                activeCount={activeCount}
                completedCount={completedCount}
                onClearCompleted={clearCompleted}
              />
              <CategoryFilter
                categoryFilter={categoryFilter}
                onCategoryFilterChange={setCategoryFilter}
              />
            </>
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

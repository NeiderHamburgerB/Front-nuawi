import Header from "./components/Header";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";
import Footer from "./components/Footer";
import { TaskProvider  } from "./contexts/task";

const App = () => {
  return (
    <div className='wrapper bg-gradient-to-t from-gray-900 to-blue-900 min-h-screen text-xl text-gray-100 flex flex-col py-10'>
      <TaskProvider>
        <Header />
        <AddTask />
        <TaskList />
        <Footer />
      </TaskProvider>
    </div>
  );
};
export default App;

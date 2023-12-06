import React, { createContext, useState, useEffect } from "react";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://back-nuawi-dev-dxjs.3.us-1.fl0.io/task/all");
        const data = await res.json();
        setTasks(data.tasks);
        setLoading(false);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  const addTask = async (values, resetForm) => {
    try {
      const res = await fetch('https://back-nuawi-dev-dxjs.3.us-1.fl0.io/task/create', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          title: values.task,
          description: values.descriptionTask,
        }),
      });
      const data = await res.json();
      setTasks([...tasks, data.task]);
      resetForm();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`https://back-nuawi-dev-dxjs.3.us-1.fl0.io/task/delete/${id}`, {
        method: 'DELETE',
      });
      if (res) {
        const updatedTasks = tasks.filter((task) => task.id !== id);
        setTasks(updatedTasks);
      } else {
        console.error(`Error al eliminar la tarea con ID ${id}`);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEdit = async (id, updatedTask) => {
    try {
      const res = await fetch(`https://back-nuawi-dev-dxjs.3.us-1.fl0.io/task/update/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
      });
      const data = await res.json();
      if (data.updated) {
        const updatedTasks = tasks.map((task) =>
          task.id === id ? { ...task, ...updatedTask } : task
        );
        setTasks(updatedTasks);
      } else {
        console.error('Error editing task:', data.error);
      }
    } catch (error) {
      setError(error.message);
    }
  };


  const handleStatus = async (id) => {
    try {
      const res = await fetch(`https://back-nuawi-dev-dxjs.3.us-1.fl0.io/task/update/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'COMPLETE' }),
      });
      const data = await res.json();
      
      if (data.updated) {
        const updatedTasks = tasks.map((task) =>
          task.id === id ? { ...task, ...data.task } : task
        );
        setTasks(updatedTasks);
      } else {
        console.error('Error editing task:', data.error);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, loading, error, addTask, handleDelete, handleEdit, handleStatus }}>
      {children}
    </TaskContext.Provider>
  );
};
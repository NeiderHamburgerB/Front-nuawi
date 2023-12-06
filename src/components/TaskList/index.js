import React, { useContext } from "react";
import TaskItem from "../TaskItem";
import {TaskContext } from "../../contexts/task";

const TaskList = () => {
  const { tasks, error, loading } = useContext(TaskContext); 

  return (
    <div className='task-list flex flex-col gap-3 p-10 container bg-gray-900 mx-auto lg:max-w-4xl'>
      {loading ? (
        <p className='text-center'>{error ? error : "Loading..."}</p>
      ) : tasks.length === 0 ? (
        <p className='text-center'>No tasks to show</p>
      ) : (
        tasks.map((task) => (
          <TaskItem
            task={task}
            key={task.id}
          />
        ))
      )}
    </div>
  );
};

export default TaskList;

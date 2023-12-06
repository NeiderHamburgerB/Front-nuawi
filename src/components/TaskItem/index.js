import { useContext, useState } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import { TaskContext } from "../../contexts/task";

const TaskItem = ({ task }) => {
  const { handleEdit, handleDelete, handleStatus } = useContext(TaskContext);
  const [isChecked, setIsChecked] = useState(task.status === 'COMPLETE');
  const [showModal, setShowModal] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);

  const handleEditSubmitter = (id) => {
    handleEdit(id, { title: editedTitle, description: editedDescription });
    setShowModal(false);
  };

  const handleDeleteSubmitter = (id) => {
    handleDelete(id);
  };

  const handleStatusSubmitter = (id) => {
    handleStatus(id);
  }

  return (
    <div className='task-item flex justify-between items-center bg-gradient-to-r from-gray-800 to-slate-800 p-5 rounded hover:from-blue-900 hover:to-gray-800 group'>
      <div className='task-item-left flex gap-3'>
        <span className='self-center'>
          <input
            type='checkbox'
            className='accent-blue-400 cursor-pointer'
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
            onClick={() => handleStatusSubmitter(task.id)}
          />
        </span>

        <p
          className={`group-hover:text-blue-400 ${
            isChecked ? "line-through text-gray-500 group-hover:text-blue-600" : null
          }`}
        >
          {task.title} {task.description}
        </p>
      </div>

      <div className='task-item-right flex gap-3 text-gray-500'>
        <button onClick={() => setShowModal(true)}>
          <FiEdit className='cursor-pointer hover:text-blue-400 duration-300' />
        </button>
        <button onClick={() => handleDeleteSubmitter(task.id)}>
          <FiTrash className='cursor-pointer hover:text-rose-500 duration-300' />
        </button>
      </div>
      
      {/* Modal para la edición */}
      {showModal && (
        <div className='modal fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50'>
          <div className='modal-content bg-gray-900 p-8 rounded-lg max-w-md'>
            <span className='close text-gray-500 hover:text-gray-700 cursor-pointer' onClick={() => setShowModal(false)}>
              &times;
            </span>
            <h2 className='text-xl font-bold mb-4'>Edit Task</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleEditSubmitter(task.id); }}>
              <input
                type='text'
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 text-gray-500'
              />
              <textarea
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                className='w-full h-24 px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 resize-none mt-4 text-gray-500'
              ></textarea>
              <button
                type='submit'
                className='border-2 border-blue-500 py-2 px-5 bg-blue-500/10 text-blue-500 hover:bg-blue-500 duration-300 hover:text-gray-900 mt-5'
             >
                Save
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default TaskItem;

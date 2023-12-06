import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TaskContext } from '../../contexts/task'; 
import { useContext } from 'react';

const AddTask = () => {
  const { addTask } = useContext(TaskContext); 

  const initialValues = {
    task: '',
    descriptionTask: '',
  };

  const validationSchema = Yup.object().shape({
    task: Yup.string().required('Task name is required'),
    descriptionTask: Yup.string().required('Description is required'),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await addTask(values, resetForm);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form className='bg-gray-900 p-10 container mx-auto flex flex-col gap-5 justify-center items-center md:flex-row md:justify-between lg:max-w-4xl'>
          <Field
            name='task'
            type='text'
            placeholder='What is the name of the task?'
            className={`bg-transparent outline-none border-b-2 border-blue-500 py-2 px-5 text-center md:text-left focus:border-blue-400 duration-300 text-white ${
              errors.task && touched.task ? 'border-red-500' : ''
            }`}
          />
          <ErrorMessage name='task' component='div' className='text-red-500' />

          <Field
            name='descriptionTask'
            type='text'
            placeholder='What is the description?'
            className={`bg-transparent outline-none border-b-2 border-blue-500 py-2 px-5 text-center md:text-left focus:border-blue-400 duration-300 text-white ${
              errors.descriptionTask && touched.descriptionTask
                ? 'border-red-500'
                : ''
            }`}
          />
          <ErrorMessage
            name='descriptionTask'
            component='div'
            className='text-red-500'
          />

          <button
            type='submit'
            className='border-2 border-blue-500 py-2 px-5 bg-blue-500/10 text-blue-500 hover:bg-blue-500 duration-300 hover:text-gray-900'
          >
            Add Task
          </button>
        </Form>
      )}
    </Formik>
  );
};


export default AddTask;
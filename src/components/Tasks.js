import { useState, useEffect } from 'react';
import { supabase } from '../supabase';

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    const { data } = await supabase.from('tasks').select('*').eq('user_id', supabase.auth.user().id);
    setTasks(data);
  }

  async function createTask(event) {
    event.preventDefault();
    const { data, error } = await supabase.from('tasks').insert({ user_id: supabase.auth.user().id, description, completed });
    if (error) {
      alert(error.message);
    } else {
      setTasks([...tasks, data[0]]);
      setDescription('');
      setCompleted(false);
    }
  }

  async function updateTask(task) {
    const { error } = await supabase.from('tasks').update({ description: task.description, completed: task.completed }).eq('id', task.id);
    if (error) {
      alert(error.message);
    }
  }

  async function deleteTask(task) {
    const { error } = await supabase.from('tasks').delete().eq('id', task.id);
    if (error) {
      alert(error.message);
    } else {
      setTasks(tasks.filter(t => t.id !== task.id));
    }
  }

  return (
    <div>
      <h1>Tasks</h1>
      <form onSubmit={createTask}>
        <label>
          Description:
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <label>
          Completed:
          <input type="checkbox" checked={completed} onChange={(e) => setCompleted(e.target.checked)} />
        </label>
        <button type="submit">Add Task</button>
      </form>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <input type="checkbox" checked={task.completed} onChange={(e) => updateTask({ ...task, completed: e.target.checked })} />
            <span>{task.description}</span>
            <button onClick={() => deleteTask(task)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tasks;

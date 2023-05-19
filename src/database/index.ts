import ENUM from "../utils/enum";

export interface TaskProp {
  id: number
  title: string
  description: string
  date: string
  category: 'active' | 'completed'
}

export interface TaskBaseProp { title: string, description: string }

const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const setDB = (name: string, data: any) => {
  if (typeof data === 'string') {
    window.localStorage.setItem(name, data);
  } else {
    window.localStorage.setItem(name, JSON.stringify(data));
  }
}

const getDB = (name: string): TaskProp[] => JSON.parse(localStorage.getItem(name) as string) || [];

const clearDB = (name: string) => window.localStorage.removeItem(name)


export const newDate = () => {
  const d = new Date();
  return `${d.getDate()} ${month[d.getMonth()]} ${d.getFullYear()}`
}

export const getDBTask = (type: 'all' | 'active' | 'completed') => {
  const tasks = getDB(ENUM.DB_NAME);
  if (type === 'all') {
    return tasks
  } else if (type === 'completed') {
    return tasks.filter(t => t.category === 'completed')
  } else {
    return tasks.filter(t => t.category === 'active')
  }
}

export const findTask = (text: string, data: TaskProp[] | null) => {
  return data?.filter(t => t.category.includes(text) || t.title.includes(text) || t.description.includes(text)) || []
}

export const findDBTask = (text: string) => {
  const tasks = getDBTask('all')
  return findTask(text, tasks)
}

export const saveDBTaskRaw = ({ title, description }: TaskBaseProp, available = false) => {
  const oldTask = getDBTask('all')
  const task: TaskProp = {
    title, description,
    date: newDate(),
    category: 'active',
    id: oldTask.length
  }
  oldTask.push(task)
  setDB(ENUM.DB_NAME, oldTask)
}

export const saveDBTask = (data: TaskProp[]) => {
  setDB(ENUM.DB_NAME, data)
}
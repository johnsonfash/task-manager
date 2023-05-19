import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { TaskBaseProp, TaskProp, getDBTask, newDate, saveDBTask, saveDBTaskRaw } from '../../database'

export interface TaskState {
  loading?: boolean
  data: TaskProp[] | null
}
const initialState: TaskState = {
  loading: false,
  data: null
}

export const accountSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    updateTasks: (state: TaskState, action: PayloadAction<TaskState>) => {
      state.data = action.payload.data || null
      state.loading = action.payload.loading || false

    },
    addToTasks: (state: TaskState, { payload: { title, description } }: PayloadAction<TaskBaseProp>) => {
      const task: TaskProp = {
        title, description,
        date: newDate(),
        category: 'active',
        id: state.data ? state.data.length + 1 : 1
      }
      state.data = state.data?.concat(task) || [task]
      saveDBTask(state.data)
    },
    loadTasksFromDB: (state: TaskState) => {
      state.data = getDBTask('all')
    },
    deleteATask: (state: TaskState, action: PayloadAction<number>) => {
      state.data = state.data?.filter(task => task.id !== action.payload) || []
      saveDBTask(state.data)
    },
    editATask: (state: TaskState, action: PayloadAction<{ id: number, description: string, title: string }>) => {
      const taskPosition = state.data?.findIndex(task => task.id === action.payload.id) ?? -1
      if (taskPosition > -1) {
        const stateCopy = state.data
        stateCopy?.splice(taskPosition, 1, { ...stateCopy[taskPosition], ...action.payload }) || []
        state.data = stateCopy
        saveDBTask(state.data ?? [])
      }
    },
    completedATask: (state: TaskState, action: PayloadAction<{ id: number, status: 'active' | 'completed' }>) => {
      const taskPosition = state.data?.findIndex(task => task.id === action.payload.id) ?? -1
      if (taskPosition > -1) {
        const stateCopy = state.data
        stateCopy?.splice(taskPosition, 1, { ...stateCopy[taskPosition], category: action.payload.status }) || []
        state.data = stateCopy
        saveDBTask(state.data ?? [])
      }
    }
  }
})

export const { updateTasks, addToTasks, loadTasksFromDB, editATask, deleteATask, completedATask } = accountSlice.actions

export default accountSlice.reducer
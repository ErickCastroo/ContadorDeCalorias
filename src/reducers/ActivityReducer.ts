import { Activity } from "../Types/Index"

export type ActivityAction =
  { type: 'Guardar_Actividad', payload: { newActividad: Activity } } |
  { type: 'Set_ActiveId', payload: { id: Activity['id'] } } |
  { type: 'Borrar_ActiveId', payload: { id: Activity['id'] } } |
  { type: 'Restaurar_App' }

export type ActivityState = {
  activities: Activity[],
  activeId: Activity['id']
}

const localStorageActivities = (): Activity[] => {
  const activities = localStorage.getItem('activities')
  return activities ? JSON.parse(activities) : []
}

export const InitialState: ActivityState = {
  activities: localStorageActivities(),
  activeId: ''

}

export const ActivityReducer = (
  state: ActivityState = InitialState,
  action: ActivityAction) => {

  if (action.type === 'Guardar_Actividad') {

    let updatedActivities: Activity[] = []

    if (state.activeId) {
      updatedActivities = state.activities.map(activity => activity.id === state.activeId ? action.payload.newActividad : activity)
    } else {
      updatedActivities = [...state.activities, action.payload.newActividad]
    }
    return {
      ...state,
      activities: updatedActivities,
      activeId: ''
    }
  }

  if (action.type === 'Set_ActiveId') {
    return {
      ...state,
      activeId: action.payload.id
    }
  }

  if (action.type === 'Borrar_ActiveId') {
    return {
      ...state,
      activities: state.activities.filter(activity => activity.id !== action.payload.id)
    }
  }

  if (action.type === 'Restaurar_App') {
    return {
      activities: [],
      activeId: ''
    }
  }

  return state
}
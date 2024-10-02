import { useState, ChangeEvent, FormEvent, Dispatch, useEffect } from 'react'

import { v4 as uuidv4 } from 'uuid'

import { Categorias } from '../../Data/Categorias'


import { Activity } from '../../Types/Index'
import { ActivityAction, ActivityState } from '../../reducers/ActivityReducer'



type FormularioProps = {
  dispatch: Dispatch<ActivityAction>,
  state: ActivityState
}

const initialState: Activity = {
  id: uuidv4(),
  categoria: 1,
  name: '',
  calorias: 0
}


function Formulario({ dispatch, state }: FormularioProps) {
  const [activity, setActivity] = useState<Activity>(initialState)

  useEffect(() => {
    if (state.activeId) {
      const selectActivity = state.activities.filter(stateActivity => stateActivity.id === state.activeId)[0]
      setActivity(selectActivity)
    }
  }, [state.activeId])

  const handlerChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
    const isNumberField = ['categoria', 'calorias'].includes(e.target.id)

    setActivity({
      ...activity,
      [e.target.id]: isNumberField ? +e.target.value : e.target.value
    })
  }
  const isValidActivity = () => {
    const { name, calorias } = activity
    return name.trim() !== '' && calorias > 0
  }

  const handlerSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    dispatch({
      type: 'Guardar_Actividad',
      payload: { newActividad: activity }
    })

    setActivity({
      ...initialState,
      id: uuidv4()
    })

  }

  return (
    <>
      <form onSubmit={handlerSubmit} className='space-y-5 bg-white shadow p-10 rounded-lg'>
        <div className='grid grid-cols-1 gap-3'>
          <label className='font-bold' htmlFor='categoria'>categorias:</label>
          <select className='border border-slate-300 p-2 rounded-lg w-full bg-white' id='categoria'
            value={activity.categoria}
            onChange={handlerChange}
          >
            {Categorias.map(categoria => (
              <option
                key={categoria.id}
                value={categoria.id}
              >
                {categoria.name}
              </option>
            ))}
          </select>
        </div>
        <div className='grid grid-cols-1 gap-3'>
          <label className='font-bold' htmlFor='name'>Actividad:</label>
          <input
            className='border border-slate-300 p-2 rounded-lg w-full bg-white'
            type='text'
            id='name'
            value={activity.name}
            onChange={handlerChange}
            placeholder='Ej. Comida Jugo de Naranja, Ensalada, Ejercicio, Pesas, Bicicleta'
          />
        </div>

        <div className='grid grid-cols-1 gap-3'>
          <label className='font-bold' htmlFor='calorias'>Calorias:</label>
          <input
            className='border border-slate-300 p-2 rounded-lg w-full bg-white'
            type='number'
            id='calorias'
            value={activity.calorias}
            onChange={handlerChange}
            placeholder='calorias ej. 300 o 500'
          />
        </div>
        <input
          type='submit'
          className='bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10'
          value={activity.categoria === 1 ? 'Guardar Comida' : 'Guardar Ejercicio'}
          disabled={!isValidActivity()}
        >
        </input>
      </form>
    </>
  )
}

export { Formulario }
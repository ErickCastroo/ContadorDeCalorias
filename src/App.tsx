import { useReducer, useEffect, useMemo } from "react"

import { ActivityReducer, InitialState } from "./reducers/ActivityReducer"

import { Formulario } from "./components/Form"
import { ActivityList } from "./components/ActivityList"
import { CalorieTracker } from "./components/CalorieTracker"




function App() {

  const [state, dispatch] = useReducer(ActivityReducer, InitialState)

  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(state.activities))
  }, [state.activities])

  const PuedeRestaurar = () => useMemo(() => state.activities.length, [state.activities])

  return (
    <>
      <header className='bg-lime-600 py-3'>
        <div className='max-w-4xl mx-auto flex justify-between items-center'>
          <h1 className='text-center text-lg font-bold text-white uppercase'>Contador de calorias</h1>

          <button 
            className='bg-white text-lime-600 px-5 py-2 rounded-lg font-bold hover:bg-slate-100 disabled:opacity-0'
            onClick={() => dispatch({ type: 'Restaurar_App' })}
            disabled={!PuedeRestaurar()}
          >
            Restaurar App
          </button>
        </div>
      </header>
      <section className=" bg-lime-500 py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <Formulario
            dispatch={dispatch}
            state={state}
          />
        </div>
      </section>

      <section className=' bg-gray-800 py-10'>
        <div className='max-w-4xl mx-auto'>
          <CalorieTracker
            activities={state.activities}
          />
        </div>
      </section>

      <section className='p-10 mx-auto max-w-4xl'>
        <ActivityList
          activities={state.activities}
          dispatch={dispatch}
        />
      </section>
    </>
  )
}

export { App }

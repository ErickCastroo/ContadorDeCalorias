import { useMemo, Dispatch } from "react"

import { Activity } from "../../Types/Index"
import { Categorias } from "../../Data/Categorias"

import { PencilSquareIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { ActivityAction } from "../../reducers/ActivityReducer"


type ActivityListProps = {
  activities: Activity[]
  dispatch: Dispatch<ActivityAction>
}


function ActivityList({ activities, dispatch }: ActivityListProps) {

  const categoriasName = useMemo(() =>
    (categoria: Activity['categoria']) => Categorias.map(cat => cat.id === categoria ? cat.name : '')
    , [activities])

  const isEmpty = useMemo(() => activities.length === 0, [activities])

  return (
    <>
      <h2 className='text-4xl font-bold text-slate-600 text-center'>
        Comida y Actividades
      </h2>
      {isEmpty ? <p className='text-center text-xl mt-5 font-bold text-slate-600'>No hay actividades aún...</p> :

        activities.map(activity => (
          <div key={activity.id} className='px-5 py-10 bg-white mt-5 flex justify-between shadow-md'>
            <div className='space-y-2 relative'>
              <p className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold ${activity.categoria === 1 ? 'bg-lime-500' : ' bg-orange-500'} `}>
                {categoriasName(+activity.categoria)}
              </p>
              <p className='text-2xl font-bold pt-5'>
                {activity.name}
              </p>
              <p className='font-black text-4xl text-lime-500'>
                {activity.calorias} {''}
                <span>Calorias</span>
              </p>
            </div>
            <div className='flex gap-5 items-center'>
              <button>
                <PencilSquareIcon
                  className={` h-8 w-8 ${activity.categoria === 1 ? 'text-lime-500' : ' text-orange-500'} `}
                  onClick={() => dispatch({ type: 'Set_ActiveId', payload: { id: activity.id } })}
                />
              </button>
              <button>
                <XCircleIcon
                  className='h-8 w-8 text-red-700'
                  onClick={() => dispatch({ type: 'Borrar_ActiveId', payload: { id: activity.id } })}
                />
              </button>
            </div>
          </div>
        ))
      }
    </>
  )
}

export { ActivityList }
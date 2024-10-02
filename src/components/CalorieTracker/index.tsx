import { useMemo } from "react"
import { Activity } from "../../Types/Index"
import { CalorieDisplay } from "../CalorieDisplay"

type CalorieTrackerProps = {
  activities: Activity[]
}
function CalorieTracker({ activities }: CalorieTrackerProps) {

  const totalCalorias = useMemo(() => activities.reduce((total, activity) => activity.categoria === 1 ? total + activity.calorias : total, 0), [activities])

  const totalActividad = useMemo(() => activities.reduce((total, activity) => activity.categoria === 2 ? total + activity.calorias : total, 0), [activities])

  const caloriasNetas = useMemo(() => totalCalorias - totalActividad, [totalCalorias, totalActividad])

  return (
    <>
      <h2 className='text-4xl font-black text-white text-center'>
        Resumen de calorias
      </h2>
      <div className='flex flex-col items-center md:flex-row md:justify-between gap-5 mt-5'>
        <CalorieDisplay
          calorias={totalCalorias}
          texto='Calorias consumidas'
        />
          <CalorieDisplay
            calorias={caloriasNetas}
            texto='Diferencia de calorias'
          />
        <CalorieDisplay
          calorias={totalActividad}
          texto='Calorias quemadas'
        />
      </div>
    </>
  )
}

export { CalorieTracker }
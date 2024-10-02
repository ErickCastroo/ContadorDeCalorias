
type CalorieTrackerProps = {
  calorias: number
  texto: string
}

function CalorieDisplay( { calorias, texto }: CalorieTrackerProps ) {
  return (
    <p className='text-white font-bold rounded-full grid grid-cols-1 gap-3 text-center'>
      <span className='font-black text-6xl text-orange' > {calorias}</span>
      {texto}
    </p>
  )
}

export { CalorieDisplay }
export default function PlayerCard({ name, images, powerstats, biography, setSelection, setGameStarted, selection }) {
  const handleChoice = (e) => {
    const choice = e.currentTarget.innerText.split(':')
    if (!selection) {
      setSelection(choice[0].toLowerCase())
      setGameStarted(true)
    }
  }

  return (
    <div className={`cardWithStats ${biography.publisher}`}>
      <h2>{name}</h2>
      <img src={images.sm} alt={name} />
      <div className='stats'>
        <p className='playerStats' onClick={handleChoice}>Intelligence: {powerstats.intelligence}</p>
        <p className='playerStats' onClick={handleChoice}>Strength: {powerstats.strength}</p>
        <p className='playerStats' onClick={handleChoice}>Speed: {powerstats.speed}</p>
        <p className='playerStats' onClick={handleChoice}>Durability: {powerstats.durability}</p>
        <p className='playerStats' onClick={handleChoice}>Power: {powerstats.power}</p>
        <p className='playerStats' onClick={handleChoice}>Combat: {powerstats.combat}</p>
      </div>
    </div>
  )
}
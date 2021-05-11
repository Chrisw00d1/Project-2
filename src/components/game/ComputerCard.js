export default function ComputerCard({ name, images, powerstats, biography, selection }) {
  return (
    <div className={`cardWithStats ${biography.publisher}`}>
      <h2>{name}</h2>
      <img src={images.sm} alt={name} />
      <div className='stats'>
        <p>Intelligence: {selection ? powerstats.intelligence : '??'}</p>
        <p>Strength: {selection ? powerstats.strength : '??'}</p>
        <p>Speed: {selection ? powerstats.speed : '??'}</p>
        <p>Durability: {selection ? powerstats.durability : '??'}</p>
        <p>Power: {selection ? powerstats.power : '??'}</p>
        <p>Combat: {selection ? powerstats.combat : '??'}</p>
      </div>
    </div>
  )
}
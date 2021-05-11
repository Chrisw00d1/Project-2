import { Link } from 'react-router-dom'


function SuperHeroCard({ id, name, image, publisher }) {
  return (
    <div className={`card ${publisher}`}>
      <Link to={`/${id}`} className='card-display'>
        <h2>{name}</h2>
        <img src={image} alt={name} />
      </Link>
    </div>
  )
}

export default SuperHeroCard
import React from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Spinner from './Spinner'


function SuperheroShow() {
  const { id } = useParams()
  const [superhero, setSuperhero] = React.useState(null)
  const [isFlipped, setIsFlipped] = React.useState(false)

  React.useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/id/${id}.json`)
      setSuperhero(data)
    }
    setTimeout(getData, 1000)
  }, [id])

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  return (
    <div className="content">
      {superhero ? (
        <div className="superhero_container">
          <div className={`card_details ${isFlipped ? 'is-flipped' : ''}`} onClick={handleFlip}>
            <div className='card_inner_details'>
              <div className={`card_frontface ${superhero.biography.publisher}`} style={{
                backgroundImage: `url(${superhero.images.md})`,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}>
                <small>(Click the card to see stats)</small>
              </div>

              <div className={`card_backface ${superhero.biography.publisher}`} style={{
                backgroundImage: `url(${superhero.images.md})`,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}>
                <div className='back_stats'>
                  <h4>STATS</h4>
                  <p>Intelligence: {superhero.powerstats.intelligence}</p>
                  <p>Strength: {superhero.powerstats.strength}</p>
                  <p>Speed: {superhero.powerstats.speed}</p>
                  <p>Durability: {superhero.powerstats.durability}</p>
                  <p>Power: {superhero.powerstats.power}</p>
                  <p>Combat: {superhero.powerstats.combat}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="details">
            <h1>{superhero.name}</h1>
            <p><span className="full_name">FULL NAME: </span>{superhero.biography.fullName}</p>

            <div className="superhero_facts">
              <h3>General: </h3>
              <p>First Appearance: {superhero.biography.firstAppearance}</p>
              <p>Publisher: {superhero.biography.publisher}</p>
              <p>Occupation: {superhero.work.occupation}</p>
            </div>

            <div className="superhero_facts">
              <h3>Connections: </h3>
              <p>Group Affiliations: {superhero.connections.groupAffiliation}</p>
              <p>Relatives: {superhero.connections.relatives}</p>

            </div>

          </div>
       
        </div>
      ) : (

        <Spinner />

      )}


    </div>
  )
}


export default SuperheroShow
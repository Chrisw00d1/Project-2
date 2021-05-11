import React from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'


function SuperheroShow() {
  const { id } = useParams()
  const [superhero, setSuperhero] = React.useState(null)
  const [isFlipped, setIsFlipped] = React.useState(false)

  React.useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/id/${id}.json`)
      setSuperhero(data)
    }
    getData()
  }, [id])

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  return (
    <div className="content">
      {superhero ? (
        <div className="superhero_container">
          <div className="card_details">
            <div className={`card_inner_details ${isFlipped ? 'is-flipped' : ''}`} onClick={handleFlip}>
              <div className="card_frontface">
                <img className="superhero_image" src={superhero.images.md} alt={superhero.name} />

              </div>

              <div className="card_backface">
                <p>back face</p>
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

        <p>...loading</p>

      )}


    </div>
  )
}


export default SuperheroShow
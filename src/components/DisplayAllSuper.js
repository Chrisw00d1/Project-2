import React from 'react'
import axios from 'axios'
import SuperHeroCard from './SuperHeroCard'
import Spinner from './Spinner'

function filterSearch(superheros, search) {
  return (superheros.filter(superhero => {
    return (superhero.name.toLowerCase().includes(search.toLowerCase()))
  }))
}
function DisplayAllSuper() {
  const [superheros, setSuperheros] = React.useState(null)
  const [search, setSearch] = React.useState('')

  React.useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('https://akabab.github.io/superhero-api/api/all.json')
        setSuperheros(data)
      } catch (err) {
        console.log(err)
      }
    }
    setTimeout(getData, 1000)
  }, [])

  const handleInput = (e) => {
    setSearch(e.target.value)
  }
  
  return (
    <div>
      <div className='content'>
        <input type='text' placeholder='Search' onInput={handleInput} />
        <div className='all-cards'>
          {superheros ? (
            filterSearch(superheros, search).map(superhero => {
              return <SuperHeroCard key={superhero.id} name={superhero.name} image={superhero.images.sm} publisher={superhero.biography.publisher} id={superhero.id} />
            })
          ) : (
            <Spinner />
          )}
        </div>
      </div>
    </div>
  )
}

export default DisplayAllSuper
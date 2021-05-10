import React from 'react'
import axios from 'axios'

function DisplayAllSuper() {
  const [superheros, getSuperheros] = React.useState()

  React.useEffect(() => {
    const getData = async () => {
      try {
        const responseData = await axios.get('')
      } catch (err) {
        console.log(err)
      }
    }
  })

  return (
    <h1>Display super heros</h1>
  )
}

export default DisplayAllSuper
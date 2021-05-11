import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Nav from './components/Nav'
import DisplayAllSuper from './components/DisplayAllSuper'
import SuperheroShow from './components/SuperheroShow'
import SuperHeroGame from './components/SuperHeroGame'

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Switch>
        <Route exact path='/' component={DisplayAllSuper} />
        <Route path='/game' component={SuperHeroGame} />
        <Route path="/:id" component={SuperheroShow} />
      </Switch>
    </BrowserRouter>
  )

}

export default App

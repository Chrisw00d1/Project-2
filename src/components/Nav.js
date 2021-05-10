import { Link } from 'react-router-dom'

function Nav() {
  return (
    <nav>
      <div>
        <Link to='/'>Home</Link>
        <Link to='/'>Test Your Luck</Link>
      </div>
      <input type='text' placeholder='name' />
    </nav>
  )
}

export default Nav
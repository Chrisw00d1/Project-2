import { Link } from 'react-router-dom'

function Nav() {
  return (
    <nav>
      <div className='navbar'>
        <Link to='/' className='link'>Home</Link>
        <Link to='/game' className='link'>Test Your Knowledge</Link>

      </div>
    </nav>
  )
}

export default Nav
import React from 'react'
import Link from 'react-router-dom'

const Nav = () => {
  return (
    <div>
            <Link to="/signup"><button>Sign Up</button></Link>
            <Link to="/login"><button>Login</button></Link>
    </div>
  )
}

export default Nav
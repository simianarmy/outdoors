import React from 'react'
import { Link } from 'gatsby'
import heroImage from '../images/IMG_4610.jpeg'

const Header = ({ siteTitle }) => (
  <div
    className="relative bg-no-repeat bg-center bg-cover"
    style={{
      backgroundImage: `url(${heroImage})`,
    }}
  >
    <div className="m-0 m-auto max-w-2xl py-6 px-4" >
      <h1 className="no-underline text-white text-3xl">
        <Link to="/" className="hover:text-white">
          {siteTitle}
        </Link>
      </h1>
    </div>
  </div>
)

export default Header

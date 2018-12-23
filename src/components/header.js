import React from 'react'
import { Link } from 'gatsby'
import heroImage from "../images/IMG_4610.jpeg";

const Header = ({ siteTitle }) => (
  <div
    style={{
      //background: '#a5b27c',
      //marginBottom: '1.45rem',
      background: `url(${heroImage}) no-repeat center`,
      backgroundSize: 'cover',
      position: 'relative'
    }}
  >
    <div
      style={{
        margin: '0 auto',
        maxWidth: 650,
        //maxWidth: 960,
        padding: '1.45rem 1.0875rem',
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: 'white',
            textDecoration: 'none',
          }}
        >
          {siteTitle}
        </Link>
      </h1>
    </div>
  </div>
)

export default Header

import React from 'react';
import { Link } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';

import Hero from '../components/hero';

const Header = ({ siteTitle }) => {
  return (
    <Hero>
      <div className="m-0 m-auto max-w-2xl py-6 px-4">
        <h1 className="no-underline text-white text-2xl sm:text-4xl">
          <Link to="/" className="hover:text-white">
            {siteTitle}
          </Link>
        </h1>
      </div>
    </Hero>
  );
};

export default Header;

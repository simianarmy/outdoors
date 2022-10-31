import React from 'react';
import PropTypes from 'prop-types';

import Header from './header';
import Footer from './footer';
import { useSiteMetadata } from '../hooks/use-site-metadata';

const Layout = ({ children }) => {
  const { title } = useSiteMetadata();

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header siteTitle={title} />
        <div className="grow mx-auto my-0 px-4 pb-6">{children}</div>
        <Footer />
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;

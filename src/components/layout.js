import React from 'react';
import PropTypes from 'prop-types';
import { PrismicProvider } from '@prismicio/react';

import Header from './header';
import Footer from './footer';
import { useSiteMetadata } from '../hooks/use-site-metadata';
import linkResolver from '../utils/link-resolver';

const Layout = ({ children }) => {
  const { title } = useSiteMetadata();

  return (
    <PrismicProvider linkResolver={linkResolver}>
      <div className="flex flex-col min-h-screen">
        <Header siteTitle={title} />
        <div className="grow mx-auto my-0 px-4 pb-6">{children}</div>
        <Footer />
      </div>
    </PrismicProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;

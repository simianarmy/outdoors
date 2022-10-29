import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

import { Head } from '../pages/index';
import Header from './header'
import Footer from './footer'

//import './layout.scss'

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
            keywords
          }
        }
      }
    `}
    render={(data) => (
      <>
        <Head data={data} />
        <div className="flex flex-col min-h-screen">
          <Header siteTitle={data.site.siteMetadata.title} />
          <div className="grow m-auto max-w-2xl pt-0 pr-1 pb-6">{children}</div>
          <Footer />
        </div>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

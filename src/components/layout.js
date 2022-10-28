import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import { Head } from '../pages/index';
import Header from './header'
import Footer from './footer'

import './layout.scss'

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
        <Head data={data}/>
        <div className="site">
          <Header siteTitle={data.site.siteMetadata.title} />
          <div className="site-content">{children}</div>
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

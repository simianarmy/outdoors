import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'
import SearchInput from '../components/search-input.js'
import FilteredList from '../components/filtered-list.js'

import './index.scss'

function IndexPage({ data }) {
  const outings = data.allMdx.edges
  const thruhikes = data.allPrismicThruhike.edges;
  const [items, setItems] = React.useState(outings)

  const filterItems = (item) => {
    const term = item.toLowerCase()
    let regex

    try {
      regex = new RegExp(`\\w*${term}\\w*`, 'gi')
    } catch (e) {
      console.warn('illegal regex input', e)
      return
    }

    const filteredItems = outings.filter(
      (item) =>
        regex.test(item.node.frontmatter.title) || regex.test(item.node.body)
    )
    setItems(filteredItems)
  }

  return (
    <Layout>
      <div className="container">
        <div className="flex-grid">
          <aside className="col sidebar">
            <div className="nav-name">
              <h4>Thru-Hikes</h4>
            </div>
            <div className="nav-items">
              {thruhikes.map(({node}) => (
                <div className="nav-item" key={node.uid}>
                  <Link to={`/${node.uid}`}>{node.data.nav_title}</Link>
                </div>
              ))}
            </div>
          </aside>
          <section className="col main">
            <SearchInput onChange={filterItems} />
            <h1>Outings</h1>
            <FilteredList items={items} />
          </section>
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          body
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
          excerpt
          fields {
            slug
          }
        }
      }
    }
    allPrismicThruhike(sort: { fields: [data___start_date], order: DESC }) {
      edges {
        node {
          uid
          data {
            nav_title
          }
        }
      }
    }
  }
`

export default IndexPage

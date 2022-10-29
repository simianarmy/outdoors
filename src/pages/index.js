import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'
import SearchInput from '../components/search-input.js'
import FilteredList from '../components/filtered-list.js'

//import './index.scss'

// Head must be exported from a Page
export const Head = ({ location, params, data, pageContext }) => {
  return (
  <>
    <title>{data.site.siteMetadata?.title}</title>
    <meta name="description" content="Marc Maugers backpacking trip reports" />
    <meta name="keywords" content={data.site.siteMetadata?.keywords} />
  </>
  );
};

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
    <Layout data={data}>
      <div className="container">
        <div className="flex flex-col sm:flex-row mt-auto mx-neg-4 mb-4">
          <aside className="mx-2 p-4 flex flex-col whitespace-nowrap">
            <div className="mb-4 text-lg">
              <h4>Thru-Hikes</h4>
            </div>
            <div className="flex flex-row sm:flex-col">
              {thruhikes.map(({node}) => (
                <div className="mr-4 text-sm sm:m-0 sm:text-base" key={node.uid}>
                  <Link to={`/${node.uid}`}>{node.data.nav_title}</Link>
                </div>
              ))}
            </div>
          </aside>
          <section className="mx-2 p-4 flex-3">
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
    site {
      siteMetadata {
        title
        keywords
      }
    }
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

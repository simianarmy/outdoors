import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'
import SearchInput from '../components/search-input.js'
import { SEO } from '../components/seo';
import FilteredList from '../components/filtered-list.js'

// Head must be exported from a Page
export const Head = () => (
  <SEO />
);

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
      <div className="container max-w-xl">
        <div className="flex flex-col sm:flex-row mt-auto mx-neg-4 mb-4">
          <aside className="mx-2 p-4 flex-col flex-1 w-1/4 whitespace-nowrap">
            <h4 className="text-lg">Thru-Hikes</h4>
            <nav className="mt-4 flex flex-row sm:flex-col">
              {thruhikes.map(({node}) => (
                <div className="mr-4 text-sm sm:m-0 sm:text-base" key={node.uid}>
                  <Link className="text-blue-600 hover:underline" to={`/${node.uid}`}>{node.data.nav_title}</Link>
                </div>
              ))}
            </nav>
          </aside>
          <section className="mx-2 p-4 flex flex-col">
            <div className="flex justify-end">
              <SearchInput onChange={filterItems} />
            </div>
            <h2 className="text-4xl text-bold mb-4">Outings</h2>
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

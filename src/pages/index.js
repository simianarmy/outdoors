import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import SearchInput from '../components/search-input.js'
import FilteredList from '../components/filtered-list.js'

class IndexPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      initialItems: props.data.allMdx.edges,
      items: [],
    }
  }

  componentDidMount() {
    this.setState({ items: this.state.initialItems })
  }

  filterItems = item => {
    const term = item.toLowerCase()
    const regex = new RegExp(`\\w*${term}\\w*`, 'gi')

    const items = this.state.initialItems.filter(item => {
      return (
        regex.test(item.node.frontmatter.title) || regex.test(item.node.body)
      )
    })

    this.setState({ items })
  }

  render() {
    return (
      <Layout>
        <SearchInput onChange={this.filterItems} />
        <div>
          <h1>Outings</h1>
          <FilteredList items={this.state.items} />
        </div>
      </Layout>
    )
  }
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
  }
`

export default IndexPage

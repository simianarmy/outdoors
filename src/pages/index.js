import React from 'react'
import { Link, graphql } from "gatsby"

import { rhythm } from "../utils/typography"
import Layout from '../components/layout'
//import Image from '../components/image'

const IndexPage = ({data}) => (
  <Layout>
    <div>
      <h1>Outings</h1>
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <div key={node.id}>
          <Link to={node.fields.slug} style={{color: "inherit", textDecoration: "none"}}>
            <h3
              style={{
                marginBottom: rhythm(1 / 4)
              }}
            >
              {node.frontmatter.title}{" "}
              <span
                style={{
                  color: "#bbb"
                }}
              >
                — {node.frontmatter.date}
              </span>
            </h3>
            <p>{node.excerpt}</p>
          </Link>
          </div>
      ))}
    </div>
  </Layout>
)

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
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

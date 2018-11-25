import React from "react"
import { graphql } from "gatsby"
import Img from 'gatsby-image'
import Layout from "../components/layout"

export default ({data}) => {
  const post = data.markdownRemark;

  return (
    <Layout>
      <div>
        <h1>{post.frontmatter.title}</h1>
        <p>
          <Img fluid={post.frontmatter.cover.childImageSharp.fluid} />
          {post.frontmatter.photos && (
            <a href={post.frontmatter.photos} rel="noopener noreferrer" target="_blank">More Photos</a>
          )}
        </p>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        photos
        cover {
          childImageSharp {
              fluid(maxWidth: 1000) {
                ...GatsbyImageSharpFluid
              }
          }
        }
      }
    }
  }
`


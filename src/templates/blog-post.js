import React from "react"
import { graphql } from "gatsby"
import Img from 'gatsby-image'
import Layout from "../components/layout"

export default ({data}) => {
  const post = data.markdownRemark;
  const frontmatter = post.frontmatter;

  return (
    <Layout>
      <div>
        <h1>{frontmatter.title}</h1>
        <br/>
        <Img fluid={frontmatter.cover.childImageSharp.fluid} />
        {frontmatter.photos && (
          <a href={frontmatter.photos} rel="noopener noreferrer" target="_blank">More Photos</a>
        )}
        <br/>
        <div className="markdownContent" dangerouslySetInnerHTML={{ __html: post.html }} />
        <div className="details">
          <table>
            <tbody>
            <tr>
              <td>Difficulty</td><td>{frontmatter.difficulty}</td>
            </tr>
            <tr>
              <td>Distance</td><td>{frontmatter.distance}</td>
            </tr>
            <tr>
              <td>Nights</td><td>{frontmatter.nights}</td>
            </tr>
            <tr>
              <td>Highest Elevation</td><td>{frontmatter.maxElevation} feet</td>
            </tr>
            <tr>
              <td>Jurisdiction</td><td>{frontmatter.jurisdiction}</td>
            </tr>
            <tr>
              <td>Map</td><td>{frontmatter.map}</td>
            </tr>
            <tr>
              <td>Trailhead</td><td>{frontmatter.trailhead}</td>
            </tr>
          </tbody>
          </table>
        </div>
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
        difficulty
        distance
        nights
        maxElevation
        jurisdiction
        map
        trailhead
      }
    }
  }
`


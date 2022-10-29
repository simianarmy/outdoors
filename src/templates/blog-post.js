import React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import get from "lodash/get";

import Layout from '../components/layout'
import Pagination from '../components/pagination'
import RouteMap from '../components/routemap';
import TagList from '../components/taglist'
import { displayDate } from '../utils/dates'

import './blog-post.scss'
//import './tags.scss'

const BlogPost = ({ data: { mdx }, pageContext, children }) => {
  const frontmatter = mdx.frontmatter
  const { next, prev } = pageContext
  const startDate = new Date(frontmatter.date)
  const endDate = new Date(startDate)
  endDate.setDate(endDate.getDate() + frontmatter.nights)

  return (
    <Layout>
      <div className="blog-post">
        <h1>{frontmatter.title}</h1>
        <br />
        {frontmatter.cover ? (
          <GatsbyImage
            image={frontmatter.cover.childImageSharp.gatsbyImageData}
            alt="cover photo"
          />
        ) : null}
        {frontmatter.photos ? (
          <div style={{ marginBottom: '5px' }}>
            <a
              href={frontmatter.photos}
              rel="noopener noreferrer"
              target="_blank"
            >
              More Photos
            </a>
          </div>
        ) : null}
        <div className="dates">
          {displayDate(startDate)} - {displayDate(endDate)}
        </div>
        <div className="body">
          {children}
        </div>
        {frontmatter.routeUrl ?
          <RouteMap embedUrl={frontmatter.routeUrl} />
          : null
        }
        <div className="details">
          <table>
            <tbody>
              <tr>
                <td>Difficulty</td>
                <td>{frontmatter.difficulty}</td>
              </tr>
              <tr>
                <td>Distance</td>
                <td>{frontmatter.distance}</td>
              </tr>
              <tr>
                <td>Nights</td>
                <td>{frontmatter.nights}</td>
              </tr>
              <tr>
                <td>Highest Elevation</td>
                <td>{frontmatter.maxElevation}</td>
              </tr>
              <tr>
                <td>Jurisdiction</td>
                <td>{frontmatter.jurisdiction}</td>
              </tr>
              <tr>
                <td>Map</td>
                <td>{frontmatter.map}</td>
              </tr>
              <tr>
                <td>Trailhead</td>
                <td>{frontmatter.trailhead}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <Pagination
          prev={{
            slug: get(prev, 'fields.slug'),
            title: get(prev, 'frontmatter.title'),
          }}
          next={{
            slug: get(next, 'fields.slug'),
            title: get(next, 'frontmatter.title'),
          }}
        />
        <TagList tags={frontmatter.tags} />
      </div>
    </Layout>
  )
}

export default BlogPost

export const query = graphql`
  query($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        date
        photos
        cover {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH)
          }
        }
        difficulty
        distance
        nights
        maxElevation
        jurisdiction
        map
        routeUrl
        trailhead
        tags
      }
    }
  }
`

import React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import get from 'lodash/get';

import Layout from '../components/layout';
import Pagination from '../components/pagination';
import RouteMap from '../components/routemap';
import { SEO } from '../components/seo';
import TagList from '../components/taglist';
import { displayDate } from '../utils/dates';

const BlogPost = ({ data: { mdx }, pageContext, children }) => {
  const frontmatter = mdx.frontmatter;
  const { next, prev } = pageContext;
  const startDate = new Date(frontmatter.date);
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + frontmatter.nights);

  return (
    <Layout>
      <div className="blog-post">
        <h1 className="text-3xl mt-10 mb-7">{frontmatter.title}</h1>
        {frontmatter.cover ? (
          <GatsbyImage image={getImage(frontmatter.cover)} alt="cover photo" />
        ) : null}
        {frontmatter.photos ? (
          <div className="mb-1.5">
            <a
              className="text-sm text-blue-600 hover:underline"
              href={frontmatter.photos}
              rel="noopener noreferrer"
              target="_blank"
            >
              More Photos
            </a>
          </div>
        ) : null}
        <div className="mt-4 text-gray-400">
          {displayDate(startDate)} - {displayDate(endDate)}
        </div>
        <article className="mt-4 prose lg:prose-xl prose-slate">
          {children}
        </article>
        {frontmatter.routeUrl ? (
          <div className="mt-4">
            <RouteMap embedUrl={frontmatter.routeUrl} />
          </div>
        ) : null}
        <div className="mt-4">
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
        <div className="mt-4">
          <TagList tags={frontmatter.tags} />
        </div>
      </div>
    </Layout>
  );
};

export default BlogPost;

export const Head = ({
  data: {
    mdx: {
      frontmatter: { title },
    },
  },
}) => {
  return <SEO title={title} />;
};

export const query = graphql`
  query ($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        date
        photos
        cover {
          childImageSharp {
            gatsbyImageData(
              layout: FULL_WIDTH
              placeholder: BLURRED
              formats: [AUTO, WEBP]
            )
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
`;

import React from "react";
import { Link, graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import { MDXRenderer } from "gatsby-plugin-mdx";

import Layout from "../components/layout";
import TagList from "../components/taglist";
import Pagination from "../components/pagination";

//import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "./blog-post.scss";
import "./tags.scss";
const _ = require("lodash");

const BlogPost = ({ data, location, pageContext }) => {
  const post = data.mdx;
  const frontmatter = post.frontmatter;
  const { next, prev } = pageContext;

  return (
    <Layout>
      <div>
        <h1>{frontmatter.title}</h1>
        <br />
        {frontmatter.cover ? (
          <GatsbyImage
            image={frontmatter.cover.childImageSharp.gatsbyImageData}
          />
        ) : null}
        {frontmatter.photos ? (
          <div style={{ marginBottom: "5px" }}>
            <a
              href={frontmatter.photos}
              rel="noopener noreferrer"
              target="_blank"
            >
              More Photos
            </a>
          </div>
        ) : null}
        <br />
        <MDXRenderer>{post.body}</MDXRenderer>
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
            slug: _.get(prev, "fields.slug"),
            title: _.get(prev, "frontmatter.title"),
          }}
          next={{
            slug: _.get(next, "fields.slug"),
            title: _.get(next, "frontmatter.title"),
          }}
        />
        <TagList tags={frontmatter.tags} />
      </div>
    </Layout>
  );
};

export default BlogPost;

export const query = graphql`
  query($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      frontmatter {
        title
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
        trailhead
        tags
      }
    }
  }
`;

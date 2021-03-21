import React from "react";
import { Link, graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import { RichText } from "prismic-reactjs";

import Layout from "../components/layout";
import TagList from "../components/taglist";
import Pagination from "../components/pagination";

const _ = require("lodash");

function ThruhikeSection({ data, location, pageContext }) {
  const section = data.prismicThruhikeSection.data;
  const { next, prev } = pageContext;
  console.log({ section });
  return (
    <Layout>
      <RichText render={section.title.raw} />
      <RichText render={section.notes.raw} />
      <div className="details">
        <table>
          <tbody>
            <tr>
              <td>Difficulty</td>
              <td>{section.difficulty}</td>
            </tr>
            <tr>
              <td>Distance</td>
              <td>{section.total_miles} mi</td>
            </tr>
            <tr>
              <td>Nights</td>
              <td>{section.nights}</td>
            </tr>
            <tr>
              <td>Highest Elevation</td>
              <td>{section.max_elevation}</td>
            </tr>
            <tr>
              <td>Map</td>
              <td>{section.map}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Pagination
        prev={{
          slug: `/${_.get(prev, "uid")}`,
          title: _.get(prev, "data.title.text"),
        }}
        next={{
          slug: `/${_.get(next, "uid")}`,
          title: _.get(next, "data.title.text"),
        }}
      />
      <TagList tags={section.tags.split(",")} />
    </Layout>
  );
}

export default ThruhikeSection;

export const query = graphql`
  query($slug: String!) {
    prismicThruhikeSection(uid: { eq: $slug }) {
      uid
      data {
        difficulty
        tags
        days_in_town
        end_time
        ending_city
        ending_geopoint {
          latitude
          longitude
        }
        maps {
          raw
        }
        max_elevation
        notes {
          raw
        }
        resupply
        start_time
        starting_city {
          html
        }
        starting_geopoint {
          latitude
          longitude
        }
        title {
          raw
          text
        }
        total_miles
      }
    }
  }
`;

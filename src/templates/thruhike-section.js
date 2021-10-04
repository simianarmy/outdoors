import React from "react";
import { Link, graphql } from "gatsby";
import { Date, RichText } from "prismic-reactjs";

import Layout from "../components/layout";
import TagList from "../components/taglist";
import Pagination from "../components/pagination";

import "./thruhike-section.scss";

const _ = require("lodash");

/**
 * A little cheat here to generate the link to the parent page
 */
function parentPagePath(tag) {
  switch (tag) {
    case "cdt21":
      return "/cdt2021";
    case "jmt20":
      return "/jmt2020";
    default:
      return "/";
  }
}

function displayTime(timestamp) {
  return Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    hour: "numeric",
  }).format(Date(timestamp));
}

function calculateNights(start, end) {
  return Math.round(
    (Date(end).getTime() - Date(start).getTime()) / (86400 * 1000)
  );
}

function ThruhikeSection({ data, location, pageContext }) {
  const section = data.prismicThruhikeSection.data;
  const { next, prev } = pageContext;
  const totalNights = calculateNights(section.start_time, section.end_time);

  return (
    <Layout>
      <Link to={parentPagePath(data.prismicThruhikeSection.tags[0])}>Back</Link>
      <section className="thruhikeSection">
        <div className="title">
          <RichText render={section.title.raw} />
        </div>
        <div className="subheading">
          <span className="locations">
            {section.starting_location} - {section.ending_location}
          </span>
          <br />
          <span className="dates">
            {displayTime(section.start_time)} - {displayTime(section.end_time)}
          </span>
        </div>
        <div className="notes">
          <div className="pattern">
            <div className="content">
              <RichText render={section.notes.raw} />
            </div>
          </div>
        </div>
        <div className="details">
          <table>
            <tbody>
              <tr>
                <td>Distance</td>
                <td>{section.total_miles} mi</td>
              </tr>
              <tr>
                <td>Nights</td>
                <td>{totalNights}</td>
              </tr>
              <tr>
                <td>Max Elevation</td>
                <td>{section.max_elevation} ft</td>
              </tr>
              <tr>
                <td>Difficulty</td>
                <td>{section.difficulty}</td>
              </tr>
              <tr>
                <td>Resupply</td>
                <td>{section.resupply ? "Yes" : "No"}</td>
              </tr>
            </tbody>
          </table>
          {section.map_html ? (
            <div dangerouslySetInnerHTML={{ __html: section.map_html }} />
          ) : null}
        </div>
      </section>
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
      tags
      data {
        difficulty
        tags
        end_time
        ending_location
        map_html
        max_elevation
        notes {
          raw
        }
        resupply
        start_time
        starting_location
        title {
          raw
          text
        }
        total_miles
      }
    }
  }
`;

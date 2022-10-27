import React from "react";
import { Link, graphql } from "gatsby";
import { Date as PrismicDate } from "prismic-reactjs";

import Layout from "../components/layout";
import Notes from "../components/notes";
import Pagination from "../components/pagination";
import SectionHeader from "../components/sectionheader";
import TagList from "../components/taglist";
import "./thruhike-section.scss";

const _ = require("lodash");

function calculateNights(start, end) {
  return Math.round(
    (PrismicDate(end).getTime() - PrismicDate(start).getTime()) / (86400 * 1000)
  );
}

function displayDateTime(timestamp) {
  return Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    hour: "numeric",
  }).format(new Date(timestamp));
}

function ThruhikeSection({ data, pageContext }) {
  const section = data.prismicThruhikeSection.data;
  const { next, prev } = pageContext;
  const totalNights = calculateNights(section.start_time, section.end_time);

  return (
    <Layout>
      <Link to={`/${section.thruhike.uid}`}>Back</Link>
      <section className="thruhikeSection">
        <SectionHeader section={section} startDate={displayDateTime(section.start_time)} endDate={displayDateTime(section.end_time)} />
        {section.notes ? <Notes richText={section.notes.raw} /> : null }
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
        next={{
          slug: `/${_.get(prev, "uid")}`,
          title: prev ? `${_.get(prev, "data.starting_location")} - ${_.get(prev, "data.ending_location")}` : null,
        }}
        prev={{
          slug: `/${_.get(next, "uid")}`,
          title: next ? `${_.get(next, "data.starting_location")} - ${_.get(next, "data.ending_location")}` : null,
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
        end_time
        ending_location
        location_icon {
          url
        }
        map_html
        max_elevation
        notes {
          raw
        }
        resupply
        start_time
        starting_location
        tags
        thruhike {
          uid
        }
        total_miles
      }
    }
  }
`;

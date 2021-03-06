import React from "react";
import { Link, graphql } from "gatsby";
import { Date } from "prismic-reactjs";

import { rhythm } from "../utils/typography";
import Layout from "../components/layout";

function displayTime(timestamp) {
  return Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
  }).format(Date(timestamp));
}

function JMT2020Page({ data }) {
  const posts = data.allPrismicThruhikeSection.edges;

  return (
    <Layout>
      <div className="thruhikePage">
        <h1>JMT 2020</h1>
        <div className="notes">Notes & Stats</div>
        <div className="sections">
          {posts.map(({ node }) => (
            <section key={node.uid}>
              <Link
                to={`/${node.uid}`}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <h3
                  style={{
                    marginBottom: rhythm(1 / 4),
                  }}
                >
                  {node.data.title.text}{" "}
                </h3>
              </Link>
              <div>
                <span
                  style={{
                    color: "#bbb",
                  }}
                >
                  {node.data.starting_location} - {node.data.ending_location}
                  <br />
                  {displayTime(node.data.start_time)} -{" "}
                  {displayTime(node.data.end_time)}
                </span>
              </div>
            </section>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default JMT2020Page;

export const query = graphql`
  query {
    allPrismicThruhikeSection(
      filter: { tags: { in: "jmt20" } }
      sort: { fields: [data___start_time], order: ASC }
    ) {
      edges {
        node {
          uid
          data {
            title {
              text
            }
            start_time
            end_time
            starting_location
            ending_location
          }
        }
      }
    }
  }
`;

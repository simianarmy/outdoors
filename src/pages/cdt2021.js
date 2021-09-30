import React from "react";
import { Link, graphql } from "gatsby";

import Layout from "../components/layout";
import { rhythm } from "../utils/typography";
import { displayMonthAndDay } from "../utils/dates";
import { ThruStats } from "../utils/thrustats";

function CDT2021Page({ data }) {
  const posts = data.allPrismicThruhikeSection.edges;
  const pdata = posts.map(p => p.node.data);

  return (
    <Layout>
      <div className="thruhikePage">
<img src="https://oneofsevenproject.com/wp-content/uploads/2017/01/CDT-Logo.png" alt="cdt logo" />
        <h1>CDT 2021</h1>
        <span
          style={{
            color: "#bbb",
          }}
        >
          {displayMonthAndDay(pdata[0].start_time)} -{" "}
          {displayMonthAndDay(pdata[pdata.length-1].end_time)}
        </span>
        <ThruStats data={pdata} zeroDays={ 11 } neroDays={ 19 } numShoes={4} />
        <div className="sections">
          <h2>Sections</h2>
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
                  {displayMonthAndDay(node.data.start_time)} -{" "}
                  {displayMonthAndDay(node.data.end_time)}
                </span>
              </div>
            </section>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default CDT2021Page;

export const query = graphql`
  query {
    allPrismicThruhikeSection(
      filter: { tags: { in: "cdt21" } }
      sort: { fields: [data___start_time], order: ASC }
    ) {
      edges {
        node {
          uid
          data {
            end_time
            ending_location
            start_time
            starting_location
            title {
              text
            }
            total_miles
          }
        }
      }
    }
  }
`;

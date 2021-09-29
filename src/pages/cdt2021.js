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

function calculateNights(start, end) {
  return Math.round(
    (Date(end).getTime() - Date(start).getTime()) / (86400 * 1000)
  );
}

function CDT2021Page({ data }) {
  const posts = data.allPrismicThruhikeSection.edges;
  const pdata = posts.map(p => p.node.data);
  const totalMiles = pdata.reduce((prev, curr) => (prev + curr.total_miles), 0);
  const totalDays = calculateNights(pdata[0].start_time, pdata[pdata.length-1].end_time) + 1;
  const zeroDays = 11; // could be calculated
  const neroDays = 19; // same
  const avgMilesPerDay = totalMiles / (totalDays - zeroDays);
  const avgMilesPerDayNoNero = totalMiles / (totalDays - zeroDays - neroDays);
  //const maxMiles = Math.max(...(pdata.map(p => p.total_miles)));

  return (
    <Layout>
      <div className="thruhikePage">
<img src="https://oneofsevenproject.com/wp-content/uploads/2017/01/CDT-Logo.png" alt="cdt logo" />

        <h1>CDT 2021</h1>
        <h2>Stats</h2>
        <table>
          <tr>
            <td><b>Miles</b></td>
            <td><span>{totalMiles}</span></td>
          </tr>
          <tr>
            <td><b>Days</b></td>
            <td><span>{totalDays}</span></td>
          </tr>
          <tr>
            <td><b>Zero Days</b></td>
            <td><span>{zeroDays}</span></td>
          </tr>
          <tr>
            <td><b>Nero Days</b></td>
            <td><span>{neroDays}</span></td>
          </tr>
          <tr>
            <td><b>Avg. Miles / Day (- zeros)</b></td>
            <td><span>{avgMilesPerDay.toFixed(1)}</span></td>
          </tr>
          <tr>
            <td><b>Avg. Miles / Day (- zero/nero)</b></td>
            <td><span>{avgMilesPerDayNoNero.toFixed(1)}</span></td>
          </tr>
          <tr>
            <td><b>Pairs of Shoes</b></td>
            <td><span>4</span></td>
          </tr>
        </table>
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

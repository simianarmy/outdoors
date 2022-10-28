import React from "react";
import { graphql } from "gatsby";
import { Link, RichText } from "prismic-reactjs";
import { get } from "lodash";

import Layout from "../components/layout";
import ThruStats from "../components/thrustats";
import SectionHike from "../components/sectionhike";
import Pagination from "../components/pagination";
import { displayMonthAndDay } from "../utils/dates";
import htmlSerializer from "../utils/html-serializer";

import './thruhike.scss';

function Nav() {
  return (
    <nav>
      <a href="#stats">Stats</a>&nbsp;
      <a href="#gear">Gear</a>&nbsp;
      <a href="#sections">Sections</a>&nbsp;
    </nav>
  );
}

function Thruhike({ data, pageContext }) {
  const hike = data.prismicThruhike.data;
  const sections = data.allPrismicThruhikeSection.edges;
  const pdata = sections.map(p => p.node.data);
  const datesHeader = pdata.length > 0 ?
   `${displayMonthAndDay(pdata[0].start_time)} - ${displayMonthAndDay(pdata[pdata.length-1].end_time)}`
    : null;
  const { next, prev } = pageContext;

  return (
    <Layout>
      <div className="thruhikePage">
        <Nav />
        <div className="header">
          {hike.icon?.url ? (
          <div className="image">
            <img src={hike.icon.url} alt={hike.icon.alt} />
          </div>
          ) : null}
          <div className="title">
            <RichText render={hike.display_title.raw} />
          </div>
        </div>
        <div className="dates">
          <span
            style={{
              color: "#bbb",
            }}
          >
            {datesHeader}
          </span>
        </div>
        <div className="info">
          <RichText render={hike.blurb.raw} htmlSerializer={htmlSerializer} />
        </div>
        {pdata.length ? <ThruStats data={pdata} {...hike} /> : null}
        <section id="gear" className="loadout">
          <h2>Gear</h2>
          <a href={Link.url(hike.lighterpack_link)} target="_blank" rel="noreferrer">Lighterpack</a>
        </section>
        <div id="sections" className="sections">
          <h2>Sections</h2>
          {sections.map(({ node }, idx) => (
            <SectionHike {...node} num={idx+1} key={idx} />
          ))}
        </div>
      <Pagination
        next={{
          slug: `/${get(prev, "uid")}`,
          title: get(prev, "data.nav_title")
        }}
        prev={{
          slug: `/${get(next, "uid")}`,
          title: get(next, "data.nav_title")
        }}
      />
      </div>
    </Layout>
  );
}

export default Thruhike;

export const query = graphql`
  query($slug: String) {
    prismicThruhike(uid: { eq: $slug }) {
      data {
        blurb {
          raw
        }
        display_title {
          raw
        }
        icon {
          url
        }
        lighterpack_link {
          url
        }
        num_zero_days
        num_nero_days
        num_shoes_worn
        pack_base_weight
      }
    }
    allPrismicThruhikeSection(
      filter: { data: { thruhike: { uid: { eq: $slug } } } }
      sort: { fields: [data___start_time], order: ASC }
    ) {
      edges {
        node {
          uid
          data {
            end_time
            ending_location
            location_icon {
              url
              alt
            }
            start_time
            starting_location
            total_miles
          }
        }
      }
    }
  }
`;

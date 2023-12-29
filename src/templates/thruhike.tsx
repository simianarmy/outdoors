import React from "react";
import { graphql, HeadProps } from "gatsby";
import { Link } from "prismic-reactjs";
import { PrismicRichText } from "@prismicio/react";
import { get } from "lodash";

import Layout from "../components/layout";
import ThruStats from "../components/thrustats";
import SectionHike from "../components/sectionhike";
import { SEO } from "../components/seo";
import Pagination from "../components/pagination";
import { displayMonthAndDay } from "../utils/dates";
import htmlSerializer from "../utils/html-serializer";

function Nav() {
  return (
    <nav className="mt-4">
      <a className="hover:underline mr-1.5 text-blue-600" href="#stats">Stats</a>&nbsp;
      <a className="hover:underline mr-1.5 text-blue-600" href="#gear">Gear</a>&nbsp;
      <a className="hover:underline mr-1.5 text-blue-600" href="#sections">Sections</a>&nbsp;
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
      <div>
        <Nav />
        <div className="flex items-center header">
          {hike.icon?.url ? (
            <div className="mr-4 h-8 image">
              <img className="mb-0" src={hike.icon.url} alt={hike.icon.alt} />
            </div>
          ) : null}
          <div className="my-4 text-3xl">
            <h1>{hike.display_title.text}</h1>
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
        <article className="prose lg:prose-xl">
          <PrismicRichText field={hike.blurb.richText} htmlSerializer={htmlSerializer} />
        </article>
        {pdata.length ? <div id="stats" className="mt-4"><ThruStats data={pdata} {...hike} /></div> : null}
        <section id="gear" className="mt-4">
          <h2 className="text-2xl mb-2">Gear</h2>
          <a href={Link.url(hike.lighterpack_link)} className="text-blue-600 hover:underline" target="_blank" rel="noreferrer">Lighterpack</a>
        </section>
        <div id="sections" className="mt-4">
          <h2 className="text-2xl">Sections</h2>
          {sections.map(({ node }, idx) => (
            <SectionHike {...node} num={idx+1} key={idx} />
          ))}
        </div>
        <div className="mt-4">
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
      </div>
    </Layout>
  );
}

export default Thruhike;

type HeadDataProps = {
  prismicThruhike: {
    data: {
      display_title: {
        text: string
      },
    },
  },
};

export const Head = (props: HeadProps<HeadDataProps>) => {
  return <SEO title={props.data.prismicThruhike.data.display_title.text} />
};

export const query = graphql`query ($slug: String) {
  prismicThruhike(uid: {eq: $slug}) {
    data {
      blurb {
        richText
      }
      display_title {
        text
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
    filter: {data: {thruhike: {uid: {eq: $slug}}}}
    sort: {data: {start_time: ASC}}
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
}`;

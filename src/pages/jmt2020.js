import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import SectionHike from "../components/sectionhike";
import ThruStats from "../components/thrustats";
import { displayMonthAndDay } from "../utils/dates";

function JMT2020Page({ data }) {
  const posts = data.allPrismicThruhikeSection.edges;
  const pdata = posts.map(p => p.node.data);

  return (
    <Layout>
      <div className="thruhikePage">
        <h1>JMT 2020</h1>
        <span
          style={{
            color: "#bbb",
          }}
        >
          {displayMonthAndDay(pdata[0].start_time)} -{" "}
          {displayMonthAndDay(pdata[pdata.length-1].end_time)}
        </span>
        <nav>
        <a href="#stats">Stats</a>&nbsp;
        <a href="#sections">Sections</a>&nbsp;
        <a href="#gear">Gear</a>
        </nav>
        <ThruStats data={pdata} zeroDays={0} neroDays={1} numShoes={1} />
        <div id="sections" className="sections">
          <h2>Sections</h2>
          {posts.map(({ node }) => (
            <SectionHike {...node} />
          ))}
        </div>
        <section id="gear" className="loadout">
          <h2>Gear</h2>
          <h4>Big 3</h4>
          <ul>
            <li>Pack: ULA Circuit</li>
            <li>Kammock ROO Double hammock</li>
            <li>hammock straps & cordage</li>
            <li>Etowah Outfitters 10x10 tarp</li>
            <li>Kelty 20 deg sleeping bag</li>
            <li>Xlymit UL sleeping pad</li>
          </ul>
          <h4>Cook</h4>
          <ul>
            <li>BearVault BV500</li>
            <li>MSR Reactor 1L stove</li>
            <li>REI cup</li>
            <li>Spoon</li>
            <li>Bic lighter</li>
          </ul>
          <h4>Hydration</h4>
          <ul>
            <li>Platypus gravity filter 2L</li>
            <li>REI nalgene 1L</li>
            <li>Potable Aqua tablets</li>
          </ul>
          <h4>Light</h4>
          <ul>
            <li>Luminaid packlite nova solar lantern</li>
            <li>?? headlamp</li>
            <li>3 AAA batteries</li>
          </ul>
          <h4>Sun</h4>
          <ul>
            <li>Sunscreen in plastic jar</li>
            <li>Chapstick</li>
            <li>sunglasses</li>
          </ul>
          <h4>Nav</h4>
          <ul>
            <li>Suunto compass</li>
            <li>Tom Harrison maps</li>
            <li>iPhone 6 (Gaia)</li>
            <li>iPhone cable</li>
            <li>Apple wall plug USB</li>
            <li>Battery pack</li>
            <li>Micro USB cable</li>
            <li>ResQLink PLB</li>
          </ul>
          <h4>Toilet</h4>
          <ul>
            <li>Trowel</li>
            <li>TP</li>
          </ul>
          <h4>Toiletries</h4>
          <ul>
            <li>Toothbrush</li>
            <li>Toothpaste</li>
            <li>Camp soap</li>
          </ul>
          <h4>1st Aid</h4>
          <ul>
            <li>Small kit</li>
          </ul>
          <h4>Wear</h4>
          <ul>
            <li>Asolo trail runners</li>
            <li>REI thermal bottom</li>
            <li>Patagonia thermal top</li>
            <li>Darn Tough socks x 2</li>
            <li>REI liner sleep socks</li>
            <li>Icebreaker boxer briefs x 2</li>
            <li>Icebreaker merino t-shirt</li>
            <li>OR wool touq</li>
            <li>OR Helium raincoat</li>
            <li>OR Helium down puffy</li>
            <li>North Face fleece</li>
            <li>River shorts</li>
          </ul>
          <h4>Misc</h4>
          <ul>
            <li>Trecking pole</li>
            <li>ULA pack cover</li>
            <li>Dry bags</li>
          </ul>
        </section>
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
            total_miles
          }
        }
      }
    }
  }
`;

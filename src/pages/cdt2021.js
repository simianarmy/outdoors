import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import ThruStats from "../components/thrustats";
import SectionHike from "../components/sectionhike";
import { displayMonthAndDay } from "../utils/dates";

import './cdt2021.scss';

const Logo = <img src="https://oneofsevenproject.com/wp-content/uploads/2017/01/CDT-Logo.png" alt="cdt logo" />;

function CDT2021Page({ data }) {
  const posts = data.allPrismicThruhikeSection.edges;
  const pdata = posts.map(p => p.node.data);

  return (
    <Layout>
      <div className="thruhikePage">
        <h1>CDT 2021</h1>
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
        <ThruStats data={pdata} zeroDays={ 11 } neroDays={ 19 } numShoes={4} />
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
            <li>Tent: Big Agnes Tiger Wall UL2</li>
            <li>Bag: EE Revelation down 20 deg</li>
            <li>ULA pack cover</li>
            <li>Big Agnes footprint</li>
            <li>Thermarest Xlite</li>
            <li>Klymit UL inflatable pillow</li>
          </ul>
          <h4>Cook</h4>
          <ul>
            <li>Zpacks bear bag L w rock sack & rope</li>
            <li>Ursack Major</li>
            <li>Loksack</li>
            <li>Vargo Bot 700 ml</li>
            <li>Soto Windmaster stove</li>
            <li>Folding knife</li>
            <li>Uco plastic spoon</li>
            <li>Bic Lighter</li>
          </ul>
          <h4>Hydration</h4>
          <ul>
            <li>Sawyer Squeeze</li>
            <li>CNOC 2L bladder</li>
            <li>REI nalgene 1L</li>
            <li>Smart Water 1L</li>
            <li>Potable Aqua tablets</li>
            <li>Katadin tablets</li>
          </ul>
          <h4>Light</h4>
          <ul>
            <li>Luminaid packlite nova solar lantern</li>
            <li>Black Diamond Cosmo headlamp</li>
            <li>3 AAA batteries</li>
          </ul>
          <h4>Sun</h4>
          <ul>
            <li>Banana Boat sunscreen spray</li>
            <li>Sunscreen in plastic jar</li>
            <li>Chapstick</li>
            <li>Baseball cap</li>
            <li>Native sunglasses</li>
          </ul>
          <h4>Nav</h4>
          <ul>
            <li>Suunto compass</li>
            <li>Ley maps</li>
            <li>iPhone 11 (Guthook, Gaia, Avenza)</li>
            <li>iPhone cable</li>
            <li>Anker wall plug 2 USB</li>
            <li>Battery pack</li>
            <li>Micro USB cable</li>
            <li>ResQLink PLB</li>
          </ul>
          <h4>Toilet</h4>
          <ul>
            <li>The Deuce #2 UL</li>
            <li>Wet wipes</li>
            <li>TP</li>
          </ul>
          <h4>Toiletries</h4>
          <ul>
            <li>Toothbrush</li>
            <li>Toothpaste</li>
            <li>Camp soap</li>
            <li>Scissors</li>
            <li>Clippers</li>
            <li>Alcohol wipes</li>
          </ul>
          <h4>1st Aid</h4>
          <ul>
            <li>Small kit</li>
            <li>3M Ultrathon Deet</li>
            <li>Tent/pack repair kit</li>
            <li>Toe warmer packets</li>
          </ul>
          <h4>Wear</h4>
          <ul>
            <li>Brooks Cascadia 15 (size 11)</li>
            <li>REI thermal bottom</li>
            <li>Patagonia thermal top</li>
            <li>Darn Tough socks x 2</li>
            <li>REI liner sleep socks</li>
            <li>Icebreaker, ExOficio boxer briefs x 2</li>
            <li>Mountain Hardwear long sleeved hiking shirt</li>
            <li>Icebreaker merino t-shirt (sleep & town)</li>
            <li>REI buff</li>
            <li>EE fleece cap</li>
            <li>Mountain Hardwear rain pants</li>
            <li>OR raincoat</li>
            <li>Melanzana fleece hoodie</li>
            <li>Glove liners</li>
            <li>Wool mittens</li>
          </ul>
          <h4>Snow (Colorado)</h4>
          <ul>
            <li>Black Diamond ice axe</li>
            <li>Katoola microspikes</li>
          </ul>
          <h4>Misc</h4>
          <ul>
            <li>Black Diamond Trail Ergo trecking poles</li>
            <li>Dry bags</li>
            <li>Sit pad</li>
            <li>Bluetooth earbuds w case</li>
            <li>Sharpie</li>
            <li>Pen</li>
          </ul>
        </section>
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
            location_icon {
              url
              alt
            }
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

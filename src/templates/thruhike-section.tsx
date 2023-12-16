import React from 'react';
import { HeadProps, Link, graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { get } from 'lodash';

import Layout from '../components/layout';
import Notes from '../components/notes';
import Pagination from '../components/pagination';
import RouteMap from '../components/routemap';
import { SectionHeaderBold } from '../components/sectionheader';
import SectionStats from '../components/sectionstats';
import { SEO } from '../components/seo';
import TagList from '../components/taglist';
import { displayDateTimeFromTimestamp } from '../utils/dates';

function ThruhikeSection({ data: { prismicThruhike, prismicThruhikeSection }, pageContext }) {
  const thruhike = prismicThruhike.data;
  const section = prismicThruhikeSection.data;
  const { next, prev } = pageContext;

  console.log({section});
  return (
    <Layout>
      <Link
        className="text-blue-600 hover:underline"
        to={`/${prismicThruhike.uid}#sections`}
      >
        {thruhike.nav_title}
      </Link>
      <div className="max-w-lg">
        <SectionHeaderBold
          section={section}
          startDate={displayDateTimeFromTimestamp(section.start_time)}
          endDate={displayDateTimeFromTimestamp(section.end_time)}
        />
        {section.cover_photo.gatsbyImageData ? (
          <GatsbyImage className="mt-4" image={getImage(section.cover_photo)} alt={section.cover_photo.alt} />
        ) : null}
        {section.notes ? <Notes richText={section.notes.richText} /> : null}
        <div>
          {section.map_html ? (
            <div dangerouslySetInnerHTML={{ __html: section.map_html }} />
          ) : null
          }
          {/* section.map_url unused for now */}
          {section.gaia_map_url ?
            <RouteMap embedUrl={section.gaia_map_url} />
            : null
          }
        </div>
        <SectionStats section={section} />
        <Pagination
          next={{
            slug: `/${get(prev, 'uid')}`,
            title: prev
              ? `${get(prev, 'data.starting_location')} - ${get(
                prev,
                'data.ending_location'
              )}`
              : null,
          }}
          prev={{
            slug: `/${get(next, 'uid')}`,
            title: next
              ? `${get(next, 'data.starting_location')} - ${get(
                next,
                'data.ending_location'
              )}`
              : null,
          }}
        />
        <div className="mt-8">
          <TagList tags={section.tags.split(',')} />
        </div>
      </div>
    </Layout>
  );
}

export default ThruhikeSection;

type HeadDataProps = {
  prismicThruhike: {
    data: { nav_title: string },
  },
  prismicThruhikeSection: {
    data: { starting_location: string, ending_location: string },
  },
};

export const Head = (props: HeadProps<HeadDataProps>) => {
  const { data: {
    prismicThruhike: { data: { nav_title } },
    prismicThruhikeSection: { data: { starting_location, ending_location } } }
  } = props;
  return (
    <SEO title={`${nav_title}: ${starting_location} to ${ending_location}`} />
  );
};

export const query = graphql`
  query ($thruHikeId: String, $slug: String!) {
    prismicThruhike(uid: { eq: $thruHikeId }) {
      uid
      data {
        nav_title
      }
    }
    prismicThruhikeSection(uid: { eq: $slug }) {
      uid
      tags
      data {
        animals
        cover_photo {
          alt
          gatsbyImageData(
            placeholder: BLURRED
            layout: FULL_WIDTH
          )
        }
        difficulty
        end_time
        ending_location
        hike_partners
        hikers_met
        location_icon {
          url
        }
        map_html
        gaia_map_url
        max_elevation
        notes {
          richText
        }
        on_trail
        resupply
        slackpack
        start_time
        starting_location
        tags
        total_miles
        way_to_town
      }
    }
  }
`;

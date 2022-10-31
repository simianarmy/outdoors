import React from 'react'
import { Link, graphql } from 'gatsby'
import { Date as PrismicDate } from 'prismic-reactjs'
import { get } from 'lodash'

import Layout from '../components/layout'
import Notes from '../components/notes'
import Pagination from '../components/pagination'
import { SectionHeaderBold } from '../components/sectionheader'
import { SEO } from '../components/seo'
import TagList from '../components/taglist'

function calculateNights(start, end) {
  return Math.round(
    (PrismicDate(end).getTime() - PrismicDate(start).getTime()) / (86400 * 1000)
  )
}

function displayDateTime(timestamp) {
  return Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit',
    hour: 'numeric',
  }).format(new Date(timestamp))
}

function ThruhikeSection({ data, pageContext }) {
  const section = data.prismicThruhikeSection.data
  const thruhike = data.prismicThruhike.data
  const { next, prev } = pageContext
  const totalNights = calculateNights(section.start_time, section.end_time)

  return (
    <Layout>
      <Link
        className="text-blue-600 hover:underline"
        to={`/${data.prismicThruhike.uid}#sections`}
      >
        {thruhike.nav_title}
      </Link>
      <div className="max-w-lg">
        <SectionHeaderBold
          section={section}
          startDate={displayDateTime(section.start_time)}
          endDate={displayDateTime(section.end_time)}
        />
        {section.notes ? <Notes richText={section.notes} /> : null}
        <div>
          <div>
            {section.map_html ? (
              <div dangerouslySetInnerHTML={{ __html: section.map_html }} />
            ) : null}
          </div>
          <table className="max-w-[420px] table-auto">
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
                <td>{section.resupply ? 'Yes' : 'No'}</td>
              </tr>
            </tbody>
          </table>
        </div>
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
        <TagList tags={section.tags.split(',')} />
      </div>
    </Layout>
  )
}

export default ThruhikeSection

export const Head = ({
  data: {
    prismicThruhike: {
      data: { nav_title },
    },
    prismicThruhikeSection: {
      data: {
        starting_location,
        ending_location,
      },
    },
  },
}) => {
  return <SEO title={`${nav_title}: ${starting_location} to ${ending_location}`} />
}

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
        total_miles
      }
    }
  }
`

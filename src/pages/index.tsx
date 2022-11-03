import React from 'react';
import { graphql } from 'gatsby';
import type { HeadProps, PageProps } from "gatsby"

import FilteredList from '../components/filtered-list.js';
import Layout from '../components/layout';
import Nav from '../components/nav';
import SearchInput from '../components/search-input.js';
import { SEO } from '../components/seo';
import useSearchFilter from '../hooks/use-search-filter';

// Head must be exported from a Page
export const Head = (props: HeadProps) => <SEO />;

export default function IndexPage({ data }: PageProps) {
  const outings = data.allMdx.edges;
  const thruhikes = data.allPrismicThruhike.edges;
  const [items, filterText, filterByText, filterByTag] = useSearchFilter(outings);

  return (
    <Layout>
      <div className="container max-w-xl">
        <div className="flex flex-col sm:flex-row mt-auto mb-4">
          <aside className="mx-2 p-4 flex-col flex-1 w-1/4 whitespace-nowrap">
            <Nav thruhikes={thruhikes} onFilter={filterByTag} />
          </aside>
          <section className="mx-2 p-4 flex flex-col sm:min-w-[460px]">
            <div className="flex justify-end">
              <div className="flex-col">
                <SearchInput onChange={filterByText} />
                {items.length !== outings.length ?
                (<div>
                  <span className="text-sm text-slate-500">
                    {items.length} result{items.length !== 1 ? 's' : ''}
                    {false && filterText ? ` for '${filterText}'` : null}
                  </span>
                </div>)
                : null}
              </div>
            </div>
            <h2 className="text-4xl text-bold mb-4">Outings</h2>
            <FilteredList items={items} />
          </section>
        </div>
      </div>
    </Layout>
  );
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
        keywords
      }
    }
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          body
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
            tags
          }
          excerpt
          fields {
            slug
          }
        }
      }
    }
    allPrismicThruhike(sort: { fields: [data___start_date], order: DESC }) {
      edges {
        node {
          uid
          data {
            nav_title
          }
        }
      }
    }
  }
`;

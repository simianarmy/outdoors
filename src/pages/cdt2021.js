import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";

function CDT2021Page({ data }) {
  console.log("CDT data", data);
  return (
    <Layout>
      <div className="thruhikePage">
        <h1>CDT 2021</h1>
      </div>
    </Layout>
  );
}

export default CDT2021Page;

export const query = graphql`
  query {
    allPrismicThruhikeSection(
      sort: { fields: [data___start_time], order: DESC }
    ) {
      edges {
        node {
          id
          data {
            title {
              text
            }
          }
        }
      }
    }
  }
`;

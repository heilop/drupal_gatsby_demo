import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = ({data}) => (
  <Layout>
    <SEO title="Home" />
    <h1>Artículos</h1>
    <ul>
    {
      data.allNodeArticle.edges.map(({ node: article }) => (
        <li>
          <div style={{ maxWidth: `300px`, marginBottom: `1.45rem`, width: `100%` }}>
          <Link to={article.path.alias}>
            <Img fluid={article.relationships.image.localFile.childImageSharp.fluid} />
          </Link>
          </div>
          <Link to={article.path.alias}>{article.title}</Link>
        </li>
      ))
    }
     </ul>

    {/* <Link to="/page-2/">Go to page 2</Link> */}
  </Layout>
)

export default IndexPage


// The result of this GraphQL query will be injected as props.data into the
// IndexPage component.
export const query = graphql`
  query {
    allNodeArticle(sort: {fields: [changed], order:DESC}) {
      edges {
        node {
          drupal_id,
          title,
          path {
            alias,
          }
          body {
            processed,
          },
          relationships {
            tags: field_tags {
              name,
            }
            image: field_image {
              localFile {
                childImageSharp {
                  fluid(maxWidth: 400, quality: 100) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
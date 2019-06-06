import React from "react"
import { Link } from "gatsby"
import Img from 'gatsby-image'

import Layout from "../components/layout"
import SEO from "../components/seo"

const articleTemplate = (props) => {
  const { classes } = props;
  const { nodeArticle: article } = props.data;

  return (
    <Layout>
      <SEO
        title={`Drupal Gatsby - ${article.title}`}
        meta={[
          {name: 'description', content: article.title},
        ]}
      />
      
      <h1>{article.title}</h1>
      <div style={{ paddingBottom : `1.45rem`, width: `100%` }}>
        <Img fluid={article.relationships.image.localFile.childImageSharp.fluid} />
      </div>
      <article dangerouslySetInnerHTML={{ __html: article.body.processed }} />
    </Layout>
  )
};

export default articleTemplate;


// The $drupal_id variable here is obtained from the "context" object passed into
// the createPage() API in gatsby-node.js.
//
// Also note the use of field name aliasing in the query. This is done to
// help normalize the shape of the recipe data.
export const query = graphql`
  query ArticleTemplate($drupal_id: String!) {
    nodeArticle(drupal_id: {eq: $drupal_id}) {
      drupal_id,
      title,
      body {
        value,
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
`;
import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'

class BusinessHomeRoll extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <div className="grid">
        {posts &&
          posts.slice(0,8).map(({ node: post }) => (
            <div className="is-parent" key={post.id}>
              <article
                className={`business-list-item tile is-child box notification gridBusinessRoll`}
              >
              <header>
                {post.frontmatter.featuredimage ? (
                  <div className="featured-thumbnail">
                    <PreviewCompatibleImage
                      imageInfo={{
                        image: post.frontmatter.featuredimage,
                        alt: `featured image thumbnail for post ${post.frontmatter.title}`,
                      }}
                    />
                  </div>
                ) : null}
                <div className="post-meta">
                  <Link
                    className="title has-text-primary is-size-4"
                    to={post.fields.slug}
                  >
                    {post.frontmatter.title}
                  </Link>
                  <div className="openBusiness">{post.frontmatter.open === true ? (<div className="openYes">Open: Modified Hours</div>) : (<div className="openNo">Closed</div>)}</div>
                </div>
              </header>
                <div>
                  {post.frontmatter.tags && post.frontmatter.tags.length ? (
                    <div>
                      <ul className="homeTaglist">
                        {post.frontmatter.tags.map(tag => (
                          <li key={tag + `tag`}>
                            <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
                <Link className="button" to={post.fields.slug}>
                  More Info →
                </Link>
              </article>
            </div>
          ))}
      </div>
    )
  }
}

BusinessHomeRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  })
}

export default () => (
  <StaticQuery
    query={graphql`
      query BusinessHomeRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "business-post" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 400)
              id
              fields {
                slug
              }
              frontmatter {
                title
                templateKey
                date(formatString: "MMMM DD, YYYY")
                tags
                open
                featuredimage {
                  childImageSharp {
                    fluid(maxWidth: 120, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data, count, limit) => <BusinessHomeRoll data={data} count={count} />}
  />
)

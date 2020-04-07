import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import { HTMLContent } from '../components/Content'

export const BusinessPostTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  helmet,
  open,
  address,
  website,
  featuredimage,
  phone,
  otherContact,
  hours,
  rules,
  support,
  additionalInfo
}) => {
  const mapLink = `https://www.google.com/maps/place/${address}`
  const phoneLink = `tel:${phone}`
  const BusinessPostText = ({ theContent, leadingText, address=false, website=false}) => {
    return (
      theContent !== null ?
        (
          <div className="businessTextSection"><h2>{leadingText}</h2>
            <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: theContent }}
          />
          {address === true ? (
             <div className="productMapLink"><a href={mapLink} target="_blank" rel="noopener noreferrer">View Map</a></div>
        ) : null}</div>
        )
          :
        null
    )
  }
  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-12 businessPageGrid">

            <div className="col1">
              <img className="businessImg" src={!!featuredimage.childImageSharp ? featuredimage.childImageSharp.fluid.src : featuredimage} alt={title} />
              <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
                {title}
              </h1>
              <div className="openBusiness">{open === true ? (<div className="openYes">Open: Modified Hours</div>) : (<div className="openNo">Closed</div>)}</div>
            </div>

            <div className="col2">
              <BusinessPostText theContent={address} leadingText="Address" address={true} />
              {website !== null ? (
                <div className="businessTextSection"><h2>Website</h2>
                  <a href={website} target="_blank" rel="noopener noreferrer">{website}</a>
                </div>
                ) : null}
              {phone !== null ? (
                <div className="businessTextSection"><h2>Phone</h2>
                  <a href={phoneLink}>{phone}</a>
                </div>
                ) : null}
              <BusinessPostText theContent={otherContact} leadingText="Other ways to get in touch" />
            </div>

            <div className="col3">
              <BusinessPostText theContent={hours} leadingText="Hours" />
              <BusinessPostText theContent={rules} leadingText="Rules to follow when visiting the store" />
              <BusinessPostText theContent={support} leadingText="Other ways you can support us" />
              <BusinessPostText theContent={additionalInfo} leadingText="Additional Info" />
            </div>

            {tags && tags.length ? (
              <div className="col3" style={{ marginTop: `2rem` }}>
                <h4>Categories</h4>
                <ul className="taglist">
                  {tags.map(tag => (
                    <li key={tag + `tag`}>
                      <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

BusinessPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  open: PropTypes.bool,
  otherContact: PropTypes.string,
  address:PropTypes.string,
  website:PropTypes.string,
  featuredimage:PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  phone:PropTypes.string,
  hours:PropTypes.string,
  rules:PropTypes.string,
  support:PropTypes.string,
  additionalInfo:PropTypes.string,
  helmet: PropTypes.object,
}

const BusinessPost = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <BusinessPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        helmet={
          <Helmet titleTemplate="%s | Businesses">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
        open={post.frontmatter.open}
        otherContact={post.frontmatter.otherContact}
        address={post.frontmatter.address}
        website={post.frontmatter.website}
        featuredimage={post.frontmatter.featuredimage}
        phone={post.frontmatter.phone}
        hours={post.frontmatter.hours}
        rules={post.frontmatter.rules}
        support={post.frontmatter.support}
        additionalInfo={post.frontmatter.additionalInfo}
      />
    </Layout>
  )
}

BusinessPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default BusinessPost

export const pageQuery = graphql`
  query BusinessPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        featuredimage {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        open
        address
        website
        phone
        otherContact
        hours
        rules
        support
        additionalInfo
        tags
      }
    }
  }
`

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
  const BusinessPostText = ({ theContent, leadingText, address=false}) => {
    return (
      theContent !== null ?
        (
          <div className="businessTextSection"><h2>{leadingText}</h2> {theContent}{address === true ? (
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
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
              <div className="openBusiness">{open === true ? (<div className="openYes">Open</div>) : (<div className="openNo">Closed</div>)}</div>
            </h1>

            <BusinessPostText theContent={address} leadingText="Address" address={true} />
            <BusinessPostText theContent={website} leadingText="Website" />
            <BusinessPostText theContent={phone} leadingText="Phone" />
            <BusinessPostText theContent={otherContact} leadingText="Other Contact Info" />
            <BusinessPostText theContent={hours} leadingText="Hours" />
            <BusinessPostText theContent={rules} leadingText="Rules to follow when visiting the store" />
            <BusinessPostText theContent={support} leadingText="Other ways you can support us" />
            <BusinessPostText theContent={additionalInfo} leadingText="Additional Info" />

            {tags && tags.length ? (
              <div style={{ marginTop: `4rem` }}>
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

            <img src={!!featuredimage.childImageSharp ? featuredimage.childImageSharp.fluid.src : featuredimage} alt={title} />
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
  console.log("data: ", post);

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

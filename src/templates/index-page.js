import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'

import Layout from '../components/Layout'
import BusinessHomeRoll from '../components/BusinessHomeRoll'

export const IndexPageTemplate = ({
  image,
  title,
  heading,
  mainpitch,
  description,
  intro,
}) => (
  <div>
    <div
      className="full-width-image margin-top-0"
      style={{
        backgroundImage: `url(${
          !!image.childImageSharp ? image.childImageSharp.fluid.src : image
        })`,
        backgroundPosition: `center center`,
        backgroundSize: `cover`,
        marginBottom: `20px`
      }}
    >
      <div
        style={{
          display: 'flex',
          height: '150px',
          lineHeight: '1',
          justifyContent: 'space-around',
          alignItems: 'left',
          flexDirection: 'column',
        }}
      >
        <h1
          className="has-text-weight-bold is-size-3-mobile is-size-2-tablet is-size-1-widescreen"
          style={{
            boxShadow:
              'rgb(161, 54, 57) 0.5rem 0px 0px, rgb(161, 54, 57) -0.5rem 0px 0px',
            backgroundColor: 'rgb(161, 54, 57)',
            color: 'white',
            lineHeight: '1',
            padding: '0.5em',
          }}
        >
          {title}
        </h1>
        <h3
          className="has-text-weight-bold is-size-5-mobile is-size-5-tablet is-size-4-widescreen"
          style={{
            boxShadow:
              'rgb(161, 54, 57) 0.5rem 0px 0px, rgb(161, 54, 57) -0.5rem 0px 0px',
            backgroundColor: 'rgb(161, 54, 57)',
            color: 'white',
            lineHeight: '1',
            padding: '0.5em',
          }}
        >
          {heading}
        </h3>
      </div>
    </div>
    <section className="section section--gradient" style={{ padding:0 }}>
      <div className="container">
        <div className="section" style={{paddingTop: 0}}>
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <div className="content">

                  <div className="content">
                    <div className="tile">
                      <h2 className="title">{mainpitch.title}</h2>
                    </div>
                    <div className="tile">
                      <p style={{ fontSize: `1.2rem` }}>{mainpitch.description}</p>
                    </div>
                    <div className="tile">
                      <p style={{ fontSize: `1.2rem`, display: `block`, marginTop: `1rem` }}>
                        This site is very new, and we're trying to add as many businesses as quickly as possible. If you're a small business owner, please feel free to fill out <Link style={{ textDecoration: `underline`, color: `#A13639` }} to="/contact">this form</Link> and we'll be updating the site every 24 hours on average.
                      </p>
                    </div>
                  </div>

                <div className="columns">
                  <div className="column is-12">
                    <h2 className="has-text-weight-semibold">
                      Latest Businesses Updated
                    </h2>
                    <BusinessHomeRoll />
                    <div className="column is-12 has-text-centered indexAllBusinesses">
                      <Link className="btn" to="/businesses">
                        View all businesses
                      </Link>
                    </div>
                  </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
)

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  mainpitch: PropTypes.object,
  description: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array,
  }),
}

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        mainpitch={frontmatter.mainpitch}
        description={frontmatter.description}
        intro={frontmatter.intro}
      />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 1900, quality: 80) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        heading
        mainpitch {
          title
          description
        }
        description
      }
    }
  }
`

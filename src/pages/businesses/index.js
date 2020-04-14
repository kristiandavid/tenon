import React from 'react'
import Helmet from 'react-helmet'

import Layout from '../../components/Layout'
import BusinessRoll from '../../components/BusinessRoll'

export default class BusinessIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <section className="section">
          <Helmet titleTemplate="Businesses | Rally Cry" defer={false}>
            <meta
              name="description"
              content={`The complete list of small businesses we have on the site so far. Rally Cry is a listing of small businesses in Hamilton, Ontario that you can support through COVID-19.`}
            />
          </Helmet>
          <div className="container">
            <h1
              className="has-text-weight-bold is-size-1"
              style={{
                // boxShadow: '0.5rem 0 0 #f40, -0.5rem 0 0 #f40',
                // backgroundColor: '#f40',
                color: '#A13639',
                padding: '1rem',
              }}
            >
              Businesses
            </h1>
            <div className="content">
              <BusinessRoll />
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}

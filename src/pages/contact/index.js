import React from 'react'
import { navigate } from 'gatsby-link'
import Layout from '../../components/Layout'

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

export default class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isValidated: false }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    const form = e.target
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...this.state,
      }),
    })
      .then(() => navigate(form.getAttribute('action')))
      .catch(error => alert(error))
  }

  render() {
    return (
      <Layout>
        <section className="section">
          <div className="container">
            <div className="content">
              <h1>Add a Business</h1>
              <p>To add or update a business, please fill out the form below with as much info as you can provide and we'll add it within 24 hours.</p>
              <form
                name="contact"
                method="post"
                action="/contact/thanks/"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={this.handleSubmit}
              >
                {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
                <input type="hidden" name="form-name" value="addBusiness" />
                <div hidden>
                  <label>
                    Don’t fill this out:{' '}
                    <input name="bot-field" onBlur={this.handleChange} />
                  </label>
                </div>
                <div className="field">
                  <label className="label" htmlFor={'name'}>
                    Your name
                  </label>
                  <div className="control">
                    <input
                      className="input"
                      type={'text'}
                      name={'name'}
                      onBlur={this.handleChange}
                      id={'name'}
                      required={true}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label" htmlFor={'email'}>
                    Your Email
                  </label>
                  <div className="control">
                    <input
                      className="input"
                      type={'email'}
                      name={'email'}
                      onBlur={this.handleChange}
                      id={'email'}
                      required={true}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label" htmlFor={'newUpdate'}>
                    Are you submitting a new business or updating an existing one?
                  </label>
                  <div className="control">
                    <select
                      className="input"
                      name={'newUpdate'}
                      onBlur={this.handleChange}
                      id={'newUpdate'}
                      required={true}>
                      <option value="new">Submitting a new business</option>
                      <option value="update">Updating an existing business</option>
                    </select>
                  </div>
                </div>
                <div className="field">
                  <label className="label" htmlFor={'businessName'}>
                    Business Name
                  </label>
                  <div className="control">
                    <input
                      className="input"
                      type={'text'}
                      name={'businessName'}
                      onBlur={this.handleChange}
                      id={'businessName'}
                      required={true}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label" htmlFor={'newUpdate'}>
                    Are you submitting a new business or updating an existing one?
                  </label>
                  <div className="control">
                    <select
                      className="input"
                      name={'newUpdate'}
                      onBlur={this.handleChange}
                      id={'newUpdate'}
                      required={true}>
                      <option value="">Select an option</option>
                      <option value="new">Submitting a new business</option>
                      <option value="update">Updating an existing business</option>
                    </select>
                  </div>
                </div>
                <div className="field">
                  <label className="label" htmlFor={'openClosed'}>
                    Is this business open during the pandemic?
                  </label>
                  <div className="control">
                    <select
                      className="input"
                      name={'openClosed'}
                      onBlur={this.handleChange}
                      id={'openClosed'}
                      required={true}>
                      <option value="">Select an option</option>
                      <option value="yes">Yes, the business is open</option>
                      <option value="no">No, sadly we've had to close for the time being</option>
                    </select>
                  </div>
                </div>
                <div className="field">
                  <label className="label" htmlFor={'businessInfo'}>
                    Business Contact Info (website, address, social media etc.)
                  </label>
                  <div className="control">
                    <textarea
                      className="textarea"
                      name={'businessInfo'}
                      onBlur={this.handleChange}
                      id={'businessInfo'}
                      required={true}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label" htmlFor={'businessCat'}>
                    Business Category/Categories<br />(add as many as you'd like, we may group similar ones together)
                  </label>
                  <div className="control">
                    <input
                      className="input"
                      type={'text'}
                      name={'businessCat'}
                      onBlur={this.handleChange}
                      id={'businessCat'}
                      required={false}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label" htmlFor={'hours'}>
                    Business Hours
                  </label>
                  <div className="control">
                    <textarea
                      className="textarea"
                      name={'hours'}
                      onBlur={this.handleChange}
                      id={'hours'}
                      required={false}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label" htmlFor={'rules'}>
                    Rules to abide by while shopping
                  </label>
                  <div className="control">
                    <textarea
                      className="textarea"
                      name={'rules'}
                      onBlur={this.handleChange}
                      id={'rules'}
                      required={false}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label" htmlFor={'support'}>
                    Ways to support the business (gift cards, online, etc)
                  </label>
                  <div className="control">
                    <textarea
                      className="textarea"
                      name={'support'}
                      onBlur={this.handleChange}
                      id={'support'}
                      required={false}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label" htmlFor={'message'}>
                    Anything else we should know?
                  </label>
                  <div className="control">
                    <textarea
                      className="textarea"
                      name={'message'}
                      onBlur={this.handleChange}
                      id={'message'}
                      required={false}
                    />
                  </div>
                </div>
                <div className="field">
                  <button className="button is-link" type="submit">
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';

class EditClient extends Component {
  constructor(props) {
    super(props);
    this.firstNameInput = React.createRef();
    this.lastNameInput = React.createRef();
    this.phoneInput = React.createRef();
    this.emailInput = React.createRef();
    this.balanceInput = React.createRef();

    this.state = {};
  }

  handleSubmit = e => {
    e.preventDefault();

    const { client, firestore } = this.props;

    const updateClient = {
      firstName: this.firstNameInput.current.value,
      lastName: this.lastNameInput.current.value,
      phone: this.phoneInput.current.value,
      email: this.emailInput.current.value,
      balance:
        this.balanceInput.current.value === ''
          ? 0
          : this.balanceInput.current.value
    };

    firestore
      .update({ collection: 'clients', doc: client.id }, updateClient)
      .then(this.props.history.push('/'));
  };

  render() {
    const { client } = this.props;

    if (client) {
      return (
        <div className="EditClient">
          <div className="row">
            <div className="col-md-06">
              <Link to="/" className="btn btn-link">
                <i className="fas fa-arrow-circle-left" />
                Back To Dashboard
              </Link>
            </div>
          </div>

          <div className="card">
            <h1 className="card-header">Edit Client</h1>
            <div className="card-body">
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="firstName"
                    minLength="2"
                    required
                    ref={this.firstNameInput}
                    defaultValue={client.firstName}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="lastName"
                    minLength="2"
                    required
                    ref={this.lastNameInput}
                    defaultValue={client.lastName}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    ref={this.phoneInput}
                    defaultValue={client.phone}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    ref={this.emailInput}
                    defaultValue={client.email}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="balance">Amount Due</label>
                  <input
                    type="text"
                    className="form-control"
                    name="balance"
                    required
                    ref={this.balanceInput}
                    defaultValue={client.balance}
                  />
                </div>
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-primary btn-block"
                />
              </form>
            </div>
          </div>
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}

EditClient.propTypes = {
  firestore: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(props => [
    { collection: 'clients', storeAs: 'client', doc: props.match.params.id }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    client: ordered.client && ordered.client[0]
  }))
)(EditClient);

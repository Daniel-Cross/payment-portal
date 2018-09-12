import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Clients extends Component {
  state = {};
  render() {
    const clients = [
      {
        id: '56363547',
        firstName: 'Daniel',
        lastName: 'Cross',
        phone: '07736224134',
        email: 'crossy1686@gmail.com',
        balance: '600'
      }
    ];

    if (clients) {
    } else {
      return <h1>Loading...</h1>;
    }
    return (
      <div className="Clients">
        <div className="row">
          <div className="col-md-6">
            <h2>
              {' '}
              <i className="fas fa-users" /> Clients{' '}
            </h2>
          </div>
          <div className="col-md-6" />
        </div>
        <table className="table table-striped">
          <thead className="thead-inverse">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {clients.map(client => (
              <tr key={client.id}>
                <td>
                  {client.firstName} {client.lastName}
                </td>
                <td>{client.email}</td>
                <td>£{parseFloat(client.balance).toFixed(2)}</td>
                <td>
                  <Link
                    to={`/clients/${client.id}`}
                    className="btn btn-secondary btn-sm"
                  >
                    <i className="fas fa-arrow-circle-right" />
                    Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Clients;

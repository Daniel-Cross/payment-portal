import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import connect from 'react-redux';
import {
  setAllowRegistration,
  setDisableBalanceOnAdd,
  setDisableBalanceOnEdit
} from '../../actions/SettingsActions';

class Settings extends Component {
  state = {};

  handleOnAdd = () => {
    const { setDisableBalanceOnAdd } = this.props;
    setDisableBalanceOnAdd();
  };

  handleOnEdit = () => {
    const { setDisableBalanceOnEdit } = this.props;
    setDisableBalanceOnEdit();
  };

  handleRegistration = () => {
    const { setAllowRegistration } = this.props;
    setAllowRegistration();
  };

  render() {
    const {
      disableBalanceOnAdd,
      disableBalanceOnEdit,
      allowRegistration
    } = this.props.settings;

    return (
      <div className="Settings">
        <div className="row">
          <div className="col-md-6">
            <Link to="/" className="btn btn-link">
              <i className="fas fa-arrow-circle-left" />
              Back To Dashboard
            </Link>
          </div>
        </div>
        <div className="card-header">Edit Settings</div>
        <div className="card-body">
          <form>
            <div className="form-group">
              <label>Allow Registration</label>{' '}
              <input
                type="checkbox"
                name="allowRegistration"
                checked={!!allowRegistration}
                onChange={this.handleRegistration}
              />
            </div>
            <div className="form-group">
              <label>Disable Balance On Add</label>{' '}
              <input
                type="checkbox"
                name="disableAllowanceOnAdd"
                checked={!!disableBalanceOnAdd}
                onChange={this.handleOnAdd}
              />
            </div>
            <div className="form-group">
              <label>Disable Balance On Edit</label>{' '}
              <input
                type="checkbox"
                name="disableAllowanceOnEdit"
                checked={!!disableBalanceOnEdit}
                onChange={this.handleOnEdit}
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

Settings.propTypes = {
  settings: PropTypes.object.isRequired,
  setDisableBalanceOnAdd: PropTypes.func.isRequired,
  setDisableBalanceOnEdit: PropTypes.func.isRequired,
  setAllowRegistration: PropTypes.func.isRequired
};

export default connect(
  (state, props) => ({
    auth: state.firebase.auth,
    settings: state.settings
  }),
  { setAllowRegistration, setDisableBalanceOnAdd, setDisableBalanceOnEdit }
)(Settings);

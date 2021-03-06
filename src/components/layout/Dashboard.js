import React from 'react';
import Clients from '../clients/Clients';
import Sidebar from './Sidebar';
import '../../styles/Dashboard.css';

const Dashboard = () => {
  return (
    <div className="Dashboard">
      <div className="row">
        <div className="col-md-10">
          <Clients />
        </div>
        <div className="col-md-2">
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

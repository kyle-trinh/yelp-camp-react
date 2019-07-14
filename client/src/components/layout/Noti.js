import React from 'react';
import { connect } from 'react-redux';

const Noti = ({ alerts }) =>
  alert !== null &&
  alerts.length > 0 &&
  alerts.map(alert => (
    <div key={alert.id} className={`noti noti-${alert.alertType}`}>
      {alert.msg}
    </div>
  ));

const mapStateToProps = state => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Noti);

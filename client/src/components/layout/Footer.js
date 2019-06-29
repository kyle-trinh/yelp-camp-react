import React, { Fragment } from 'react';
import { connect } from 'react-redux';

const Footer = ({ campground }) => {
  return campground.loading || campground.campground === null ? null : (
    <Fragment>
      <footer>Copyright &copy; 2019 by Binh Trinh. All rights reserved.</footer>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  campground: state.campground
});

export default connect(mapStateToProps)(Footer);

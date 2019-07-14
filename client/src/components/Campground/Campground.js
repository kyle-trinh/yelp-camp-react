import React, { useEffect, Fragment } from 'react';
import { getCampground } from '../../actions/campground';

import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import Navbar from '../layout/Navbar';
import CampgroundHeader from './CampgroundHeader';
import CampgroundDetail from './CampgroundDetail';
import CommentList from './comment/CommentList';

const Campground = ({ match, getCampground, campground }) => {
  useEffect(() => {
    getCampground(match.params.id);
  }, [getCampground, match.params.id]);
  return campground.loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <header>
        <Navbar className="menu " />
        <CampgroundHeader campground={campground.campground} />
      </header>

      <div className="campground-detail-section">
        <CampgroundDetail campground={campground.campground} />
      </div>

      <div className="section-campgrounds dark-bg p-3">
        <CommentList
          campgroundId={campground.campground._id}
          comments={campground.campground.comments}
        />
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  campground: state.campground.campground
});

export default connect(
  mapStateToProps,
  { getCampground }
)(Campground);

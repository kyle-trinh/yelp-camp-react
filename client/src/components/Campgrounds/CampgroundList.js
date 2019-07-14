import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCampgrounds, clearCampground } from '../../actions/campground';
import Spinner from '../layout/Spinner';
import CampgroundBadge from './CampgroundBadge';

const CampgroundList = ({ getCampgrounds, campgrounds, clearCampground }) => {
  useEffect(() => {
    getCampgrounds();
    clearCampground();
  }, [getCampgrounds, clearCampground]);
  return (
    <div className="section-campgrounds p-3" id="campground-section">
      <div className="container">
        <h1 className="text-primary section-header">Campgrounds</h1>
        <p className="sub-text">
          View our hand-picked campgrounds from all over the world
        </p>
        <Link to="/campground/new" className="btn btn-primary my-1">
          <i className="fas fa-plus" /> Add new Campground
        </Link>
        <div className="campgrounds-container">
          {campgrounds.loading ? (
            <Spinner />
          ) : (
            <Fragment>
              {campgrounds.campgrounds.map(campground => (
                <CampgroundBadge campground={campground} key={campground._id} />
              ))}
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  campgrounds: state.campground.campgrounds
});

export default connect(
  mapStateToProps,
  { getCampgrounds, clearCampground }
)(CampgroundList);

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getCampgrounds } from '../../actions/campground';
import Spinner from './Spinner';

const CampgroundList = ({
  getCampgrounds,
  campground: { campgrounds, loading }
}) => {
  useEffect(() => {
    getCampgrounds();
  }, [getCampgrounds]);
  return (
    <div className="section-campgrounds">
      <h1>Campgrounds</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="campgrounds">
          {campgrounds.map(campground => (
            <div key={campground._id} className="col-1-of-3">
              <img src={campground.image} alt={campground.title} />
              <h3>{campground.title}</h3>
              <a className="btn btn-primary" href="#!">
                More info
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  campground: state.campground
});

export default connect(
  mapStateToProps,
  { getCampgrounds }
)(CampgroundList);

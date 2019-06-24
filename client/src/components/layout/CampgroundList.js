import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getCampgrounds } from '../../actions/campground';
import Spinner from './Spinner';
import { Link } from 'react-router-dom';

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
      <p>View our hand-picked campgrounds from all over the world!</p>
      <div className="right-align">
        <Link to="add-campground" className="btn btn-primary">
          <i className="fas fa-plus" />
          Add new campground
        </Link>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <div className="campgrounds">
          {campgrounds.map(campground => (
            <div key={campground._id} className="col-1-of-3">
              <img src={campground.image} alt={campground.title} />
              <h3>{campground.title}</h3>
              <Link
                to={`/campgrounds/${campground._id}`}
                className="btn btn-primary">
                More info
              </Link>
              {/* <a className="btn btn-primary" href="#!">
                More info
              </a> */}
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

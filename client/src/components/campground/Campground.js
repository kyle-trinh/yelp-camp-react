import React, { useEffect, Fragment } from 'react';
import { getCampground } from '../../actions/campground';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import Navbar from '../layout/Navbar';

const Campground = ({
  match,
  getCampground,
  campground: { campground, loading }
}) => {
  useEffect(() => {
    getCampground(match.params.id);
  }, [getCampground, match.params.id]);
  return loading || campground === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <header>
        <Navbar className="menu" />
        <div className="title-text-box">
          <h1>{campground.title}</h1>
        </div>
        <div
          className="campground-cover-image"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.4)),url(${
              campground.coverImage
            })`
          }}
        />
      </header>
      <section className="campground-detail">
        <div className="campground-description">
          <h2>About</h2>
          <h1>{campground.title}</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error,
            consectetur suscipit eum ut, consequatur deleniti earum vel
            provident iure molestias rerum doloribus amet accusamus harum, animi
            accusantium perspiciatis soluta tempora.
          </p>
        </div>

        <div className="campground-image">
          <img src={campground.image} alt={campground.title} />
        </div>
      </section>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  campground: state.campground
});

export default connect(
  mapStateToProps,
  { getCampground }
)(Campground);

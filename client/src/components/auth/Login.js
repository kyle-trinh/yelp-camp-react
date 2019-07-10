import React from 'react';

const Login = () => {
  return (
    <div>
      <div>
        <section className="container">
          <h1 className="text-primary">Sign in</h1>
          <p className="lead">
            {' '}
            <i className="fas fa-user" /> Sign into your account{' '}
          </p>
          <form className="form">
            <div className="form-group">
              <input
                type="email"
                placeholder="Email address"
                name="email"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                name="password"
                minLength="6"
              />
            </div>

            <input type="submit" className="btn btn-primary" value="Login" />
          </form>

          <p className="lead">
            Don't have an account? <a to="/register">Sign up</a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default Login;

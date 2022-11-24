/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Home from '../../images/Home.svg';
import './homeStyle.scss';

function HomePage({
  handle,
}) {
  // Hook created to manage settings search:
  const [state, setState] = useState({ keyword: '', zip_code: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setState((prevState) => ({
      ...prevState,
      keyword: state.keyword,
      zip_code: state.zip_code,
    }));
  };
  return (
    <div className="home">
      <header>
        <h1 className="home-title"> Trouvez l&apos;activité qui vous correspond</h1>
      </header>

      <section className="form-home">
        <div>
          <form className="ui large form" onSubmit={handleSubmit} noValidate>
            <div className="equal width fields">
              <div className="field color2">
                <label>Nom de l&apos;activité</label>
                <input
                  placeholder="Judo..."
                  value={state.keyword}
                  onChange={handleChange}
                  name="keyword"
                />
              </div>

              <div className="field color2">
                <label>Code postal</label>
                <input
                  placeholder="69003..."
                  value={state.zip_code}
                  onChange={handleChange}
                  name="zip_code"
                  required
                />

              </div>
            </div>
            <button
              className="ui color1 button field-submit"
              type="submit"
              onClick={(e) => handle(e, state)}
            >
              {' '}
              <i className="icon search"> </i>
            </button>
            <div className="ui hidden divider" />
          </form>
        </div>
      </section>

      <section className="image-section">
        <img src={Home} alt="accueil" className="home-image" />
        <a href="https://storyset.com/health" className="attribution">Health illustrations by Storyset</a>
      </section>
    </div>

  );
}

HomePage.propTypes = {
  handle: PropTypes.func.isRequired,
};

HomePage.defaultProps = {};

export default React.memo(HomePage);

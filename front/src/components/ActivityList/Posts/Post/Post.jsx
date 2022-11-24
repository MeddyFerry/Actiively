/* eslint-disable react/no-unused-prop-types */
/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import './postStyles.css';

function Post({
  name,
  city,
  day,
  image_url,
  organismName,
  price,
  price_type,
  zip_code,
  code_activity,
  level,
  gender,
}) {
  // To identify the page we are currently on
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState('');

  // Give the URL to state whenever URL changes
  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);

  return (
    <div>
      <article className="container-post">
        {/* If on organism page, link redirects to private activity URL */}
        {currentPath === '/organism/activities' && (
        <Link to={`/organism/activity/${code_activity}`} className="appheader-profile">
          <img className="image" alt={name} src={image_url} />
        </Link>
        )}
        {/* Otherwise redirects to public activity */}
        {currentPath !== '/organism/activities' && (
        <Link to={`/activity/${code_activity}`} className="imagestyle">
          <img className="image" alt={name} src={image_url} />
        </Link>
        )}
        <p className="post-title">{name}</p>
        <p className="post-organism">{organismName}</p>
        <strong className="post-zip">
          {zip_code}
          {' '}
          {city}
        </strong>
        <strong className="post-zip">
          {day}
        </strong>
        <strong className="post-zip">
          {level}
        </strong>
        <strong className="post-zip">
          {gender}
        </strong>
        <p className="post-price">
          {price}
          {' '}
          €
          {' '}
          {price_type}
        </p>
      </article>
    </div>
  );
}

Post.propTypes = {
  name: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  day: PropTypes.string.isRequired,
  image_url: PropTypes.string.isRequired,
  zip_code: PropTypes.string.isRequired,
  code_activity: PropTypes.number.isRequired,
  level: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  price_type: PropTypes.string.isRequired,
  organismName: PropTypes.string,
};

Post.defaultProps = {
  organismName: '',
};

export default React.memo(Post);

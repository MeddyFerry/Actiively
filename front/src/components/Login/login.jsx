import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import Sport from '../../images/Sport.svg';
import './login.scss';

function Login({
  setToken,
  setIsLogged,
  isLogged,
}) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errMsg, setErrMsg] = useState('');

  const navigate = useNavigate();

  // To avoid bug on refresh, navigate to profile if logged in
  useEffect(
    () => {
      if (isLogged) {
        navigate('/organism/profile');
      }
    },
    [],
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:3001/api/v1/organism/login',
        JSON.stringify({ email, password }),
        {
          headers: { 'Content-Type': 'application/json' },
        },
        { withCredentials: true },
      );
      const { token } = response.data;

      if (token === undefined) {
        setErrMsg('Vos identifiants n\'existent pas.');
        localStorage.clear();
        navigate('/login');
        return;
      }

      setToken(token);
      const login = true;
      setIsLogged(login);
      navigate('/organism/profile');
    }
    catch (err) {
      if (!err?.response) {
        setErrMsg('Le serveur ne répond pas');
        console.log(errMsg);
      }
      else {
        setErrMsg('Les identifiants ne correspondent pas. Veuillez réessayer.');
        console.log(errMsg);
      }
    }
  };

  return (
    <div className="container container-login">
      <div className="container-image">
        <img src={Sport} alt="Sport" className="image" />
      </div>

      <div className="container-form container-form-login">
        <div>
          <h2 className="form-title"> Connexion organisme</h2>
        </div>
        <div>
          <h2 className="form-error">{errMsg}</h2>
        </div>
        <form className="ui form container-form" onSubmit={handleSubmit}>
          <div className="field">
            <input type="email" placeholder="adresse mail" onChange={(event) => setEmail(event.target.value)} />
          </div>
          <div className="field">
            <input type="password" placeholder="mot de passe" onChange={(event) => setPassword(event.target.value)} />
          </div>

          <div className="field">
            <button className="ui color1 button" type="submit">Connexion</button>
          </div>

        </form>
        <div>
          <Link to="/register" className="link"> Pas encore inscrit ?</Link>
        </div>
        <div>
          <a href="https://storyset.com/together" className="attribution">Together illustrations by Storyset</a>
        </div>
      </div>
    </div>

  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
  setIsLogged: PropTypes.func.isRequired,
  isLogged: PropTypes.bool.isRequired,
};

export default React.memo(Login);

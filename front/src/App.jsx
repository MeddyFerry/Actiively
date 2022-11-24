/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {
  Routes, Route, useNavigate, Navigate,
} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import Home from './components/Home/home';
import Activity from './components/Activity/Activity';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Registration from './components/Registration/registration';
import Login from './components/Login/login';
import NotFound from './components/NotFound/NotFound';
import ActivityList from './components/ActivityList/ActivityList';
import Profil from './components/Profil/profil';
import ModifProfil from './components/ModifProfil/modifProfil';
import ModifActivity from './components/ModifActivity/modifActivity';
import CreateActivity from './components/CreateActivity/createActivity';
import OrganismActivities from './components/OrganismActivities/OrganismActivities';

import useToken from './components/Hooks/useToken';
import './styles/index.scss';

function App() {
  // Hook created to manage parametres search:
  const [keyword, setkeyword] = useState('');
  const [results, setResults] = useState([]);

  // Hook created to manage token
  const { token, setToken } = useToken();
  const [isLogged, setIsLogged] = useState(false);

  // To enable redirection
  const navigate = useNavigate();

  // Search request

  const postData = async () => {
    if (!keyword.zip_code && !keyword.keyword) {
      return;
    }
    try {
      await axios.post('http://localhost:3001/api/v1/activity/search', {
        keyword: keyword.keyword,
        zip_code: keyword.zip_code,
      })

        .then((res) => {
          setResults(res.data);
        });
    }
    catch (error) {
      console.log(error);
    }
  };

  useEffect(
    () => {
      postData();
    },
    [keyword],
  );

  // Login still active on refresh
  useEffect(
    () => {
      if (token) {
        setIsLogged(true);
      }
    },
    [],
  );

  // activity search parametre feature
  const handleClick = (e, activity) => {
    e.preventDefault();
    const act = `${activity.keyword}%`;
    const key = `${activity.zip_code}%`;
    // function wtih informations required for activity search
    if (key === '%') {
      swal('Oops! Veuillez saisir un code postal (entre 2 et 5 chiffres)');
      return;
    }

    setkeyword({
      keyword: act,
      zip_code: key,
    });

    // Redirection to results page on click on Submit
    navigate('/activity');
  };

  return (
    <div className="App">
      <Header
        isLogged={isLogged}
        setIsLogged={setIsLogged}
        setToken={setToken}
      />
      <Routes>
        <Route
          path="/"
          element={(
            <Home
              handle={handleClick}
            />
          )}
        />
        <Route
          path="/activity"
          element={(
            <ActivityList
              results={results}
            />
          )}
        />
        <Route
          path="/activity/:id"
          element={(
            <Activity />
          )}
        />
        <Route
          path="/register"
          element={<Registration />}
        />
        <Route
          path="/login"
          element={(
            <Login
              setToken={setToken}
              setIsLogged={setIsLogged}
              isLogged={isLogged}
            />
          )}
        />
        {/* Restricted pages */}
        <Route
          path="/organism/profile"
          element={isLogged ? (
            <Profil
              token={token}
              setToken={setToken}
              setIsLogged={setIsLogged}
            />
          ) : <Navigate replace to="/login" />}
        />
        <Route
          path="/organism/profile/edit"
          element={isLogged ? <ModifProfil token={token} /> : <Navigate replace to="/login" />}
        />
        <Route
          path="/organism/create"
          element={isLogged ? <CreateActivity token={token} /> : <Navigate replace to="/login" />}
        />
        <Route
          path="/organism/activities"
          element={isLogged ? <OrganismActivities token={token} /> : <Navigate replace to="/login" />}
        />
        <Route
          path="/organism/activity/:id"
          element={isLogged ? <Activity token={token} /> : <Navigate replace to="/login" />}
        />
        <Route
          path="/organism/activity/:id/edit"
          // element={<ModifActivity token={token} />}
          element={isLogged ? <ModifActivity token={token} /> : <Navigate replace to="/login" />}
        />
        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

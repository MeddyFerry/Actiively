/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { Button, Icon } from 'semantic-ui-react';
import './modifProfil.scss';
import axios from 'axios';
import Sport from '../../images/Sport2.svg';

function ModifProfil({
  token,
}) {
  const [organism, setOrganism] = useState({});

  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    axios
      .patch(
        'http://localhost:3001/api/v1/organism/profile/edit',
        data,
        {
          headers: {
            authorization: token,
          },
        },
      )
      .then((response) => {
        console.log(response.data);
        swal({
          title: 'Le profil a bien été modifié !',
          icon: 'success',
        });
        setOrganism(response.data);
      })
      .catch((error) => {
        console.log(error.data);
      });
    navigate('/organism/profile');
  };

  // Request to API to get profile data of an organism depending on token
  const fetchOrganism = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/v1/organism/profile', {
        headers: {
          authorization: token,
        },
      });
        // Give data to state
      setOrganism(response.data.user);
    }
    catch (error) {
      console.log(error);
    }
  };

  // useEffect so that data is fetched on mount
  useEffect(
    () => {
      fetchOrganism();
    },
    [],
  );

  return (
    <div className="container">
      <div className="container-image">
        <img src={Sport} alt="Sport" className="image" />
      </div>
      <div className="container">
        <div className="container-form">
          <div className="random">
            <h1 className="container-title">Modifier mon profil</h1>
            <p className="cancel-modif">
              <Link to="/organism/profile" className="link">
                <Button
                  animated="vertical"
                  className="ui color1 button"
                >
                  <Button.Content hidden>
                    <Icon name="home" />
                  </Button.Content>
                  <Button.Content visible>
                    X
                  </Button.Content>
                </Button>
              </Link>
            </p>
          </div>

          <form className="ui form container-form" onSubmit={handleSubmit(onSubmit)}>

            <div className="field">

              <label className="label-form">
                Nom
              </label>
              <input
                placeholder={organism.name}
                id="nom"
                type="text"
                name="nom"
                {...register('name')}
              />
            </div>

            <div className="field">
              <label>
                Numéro de téléphone
              </label>
              <input
                placeholder={organism.phone_number}
                id="téléphone"
                type="text"
                name="téléphone"
                {...register('phone_number')}
              />
            </div>

            <div className="field">
              <label>
                E-mail de contact
              </label>
              <input
                placeholder={organism.contact_email}
                id="mailContact"
                type="text"
                name="mailContact"
                {...register('contact_email')}
              />
            </div>
            <div className="field">
              <label>
                Description
              </label>
              <textarea
                placeholder={organism.description}
                id="description"
                type="text"
                name="
              description"
                {...register('description')}
              />
            </div>

            <Button type="submit" className="ui color1 button"> Modifier</Button>
          </form>
        </div>
      </div>
    </div>
  );
}

ModifProfil.propTypes = {
  token: PropTypes.string.isRequired,
};

export default React.memo(ModifProfil);

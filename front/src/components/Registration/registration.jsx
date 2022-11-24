/* eslint-disable radix */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { Icon, Button } from 'semantic-ui-react';
import axios from 'axios';
import Sport from '../../images/Sport.svg';

import './registration.scss';
// signifier a l'utilisateur que son formulaire est bien envoyé

function Registration() {
  const navigate = useNavigate();

  const {
    register, handleSubmit, watch, formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      phone_number: '',
      contact_email: '',
      description: '',
    },
  });

  const password = useRef({});
  password.current = watch('password', '');

  const onSubmit = (data) => {
    axios
      .post(
        'http://localhost:3001/api/v1/organism/register',
        data,
      )
      .then((response) => {
        console.log(response.data);
        swal({
          title: 'Votre organisme a bien été créé !',
          text: 'Veuillez vous connecter.',
          icon: 'success',
        });
      })
      .catch((error) => {
        console.log(error.data);
      });
    navigate('/organism/profile');
  };

  return (
    <div className="container ">
      <div className="container-image">
        <img src={Sport} alt="Sport" className="image" />
      </div>
      <div className="container-form">

        <h1 className="container-title">Inscription</h1>

        <form className="ui form container-form" onSubmit={handleSubmit(onSubmit)}>

          <div className="field">
            <label className="label-form">
              Nom de l&apos;organisme
              <Icon disabled name="user" size="large" className="icon" />
            </label>
            <input
              placeholder="Les amis de la forêt..."
              id="name"
              type="text"
              name="name"
              {...register('name', {
                required: 'Ce champ est obligatoire',
                minLength: {
                  value: 3,
                  message: '3 caractères minimum',
                },
              })}
            />
          </div>
          {errors.name && <p className="errors">{errors.name.message}</p>}

          <div className="field">
            <label>
              E-mail de connexion
              <Icon disabled name="mail" size="large" className="icon" />
            </label>
            <input
              placeholder="MonOrganisme@gmail.com"
              id="email"
              type="text"
              name="email"
              {...register('email', {
                required: 'Ce champ est obligatoire',
                pattern: {
                  value: /(.+)@(.+){2,}\.(.+){2,}/,
                  message: 'format adresse mail invalide',
                },
              })}
            />
          </div>
          {errors.email && <p className="errors">{errors.email.message}</p>}

          <div className="field">
            <label>
              Mot de passe
              <Icon disabled name="key" size="large" className="icon" />
            </label>
            <input
              placeholder="Mot de passe..."
              id="password"
              type="password"
              name="password"
              {...register('password', {
                required: 'un mot de passe est requis',
                pattern: {
                  value: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
                  message: 'format invalide',
                },
                minLength: {
                  value: 3,
                  message: 'doit contenir au moins 3 caractères',
                },
              })}

            />
          </div>
          {errors.password && <p className="errors">{errors.password.message}</p>}
          <div className="field">
            <label>
              Confirmer le mot de passe
              <Icon disabled name="key" size="large" className="icon" />
            </label>
            <input
              placeholder="Confirmez le mot de passe"
              id="confirm_password"
              type="password"
              name="confirm_password"
              {...register('confirm_password', {
                validate: (value) => value === password.current || 'Les mots de passe ne correspondent pas',
              })}
            />
          </div>
          {errors.confirm_password && <p className="errors">{errors.confirm_password.message}</p>}
          <div className="field">
            <label>
              Numéro de téléphone
              <Icon disabled name="phone" size="large" className="icon" />
            </label>
            <input
              placeholder="06 20 76..."
              id="phone_number"
              type="text"
              name="phone_number"
              {...register('phone_number', {
                required: 'Ce champ est obligatoire',
                pattern: {
                  value: /^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[\s.-]?[1-9](?:(?:[\s.-]?\d{1}){8}|\d{2}(?:[\s.-]?\d{3}){2})$/,
                  message: 'numéro de téléphone invalide',
                },
              })}
            />
          </div>
          {errors.phone_number && <p className="errors">{errors.phone_number.message}</p>}

          <div className="field">
            <label>
              E-mail de contact
              <Icon disabled name="mail" size="large" className="icon" />
            </label>
            <input
              placeholder="MonOrganisme@gmail.com..."
              id="contact_email"
              type="text"
              name="contact_email"
              {...register('contact_email', {
                required: 'Ce champ est obligatoire',
                pattern: {
                  value: /(.+)@(.+){2,}\.(.+){2,}/,
                  message: 'Adresse mail invalide',
                },
              })}
            />
          </div>
          {errors.contact_email && <p className="errors">{errors.contact_email.message}</p>}

          <div className="field">
            <label>
              Description
              <Icon disabled name="pencil" size="large" className="icon" />
            </label>
            <textarea
              placeholder="Ma super association..."
              id="description"
              type="text"
              name="
              description"
              {...register('description', {
                required: 'Ce champ est obligatoire',
              })}
            />
          </div>
          {errors.contact_email && <p className="errors">{errors.contact_email.message}</p>}

          <div className="field">
            <Button
              type="submit"
              className="ui color1 button"
            >
              Envoyer

            </Button>
          </div>
        </form>
      </div>

    </div>
  );
}

export default React.memo(Registration);

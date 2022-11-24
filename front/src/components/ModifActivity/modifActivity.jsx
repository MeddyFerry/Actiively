/* eslint-disable no-console */
/* eslint-disable indent */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import { Button, Icon } from 'semantic-ui-react';
import axios from 'axios';
import './modifActivity.scss';
import Sport from '../../images/Sport3.svg';

function ModifActivity({
    token,
}) {
    const [activity, setActivity] = useState({});
    const navigate = useNavigate();
    // Used params to add id to URL when sending an axios request
    let id = useParams();
    // Transformed result to number to match format set in the Back
    id = Number(id.id);
    const {
        register, handleSubmit, formState: { errors },
    } = useForm({
        defaultValues: {
            name: '',
            description: '',
            address: '',
            zip_code: '',
            city: '',
            price: '',
            price_type: '',
            gender: '',
            level: '',
            day: '',
            start_time: '',
            end_time: '',

        },
    });

    // Request to API to get data for an Activity for placeholders
    const fetchActivity = async () => {
        try {
        const response = await axios.get(`http://localhost:3001/api/v1/activity/${id}`);
        // Update states with results
        setActivity(response.data);
        }
        catch (error) {
        console.log(error);
        }
    };

    // Post request to update data
    const onSubmit = (data) => {
        axios
            .patch(
                `http://localhost:3001/api/v1/organism/activity/${id}/edit`,
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
                    title: "L'activité a bien été modifiée !",
                    icon: 'success',
                  });
                setActivity(response.data);
            })
            .catch((error) => {
                console.log(error.data);
            });
        navigate(`/organism/activity/${id}`);
    };

    // useEffect so that data is fetched on mount
    useEffect(
         () => {
         fetchActivity();
        },
          [],
        );

    return (

        <div className="container">

            <div className="container-image">
                <img
                    src={Sport}
                    alt="Sport"
                    className="image"
                />
            </div>
            <div className="container">
                <div className="container-form">
                    <div className="style_tit">
                        <h1 className="style_tit">Modifier mon activité</h1>
                    </div>

                    <form className="ui form container-form" onSubmit={handleSubmit(onSubmit)}>

                    <div className="label-select">
                        <label className="label-form">
                                    URL de l&apos;image
                        </label>
                                <input
                                    placeholder={activity.image_url}
                                    id="image_url"
                                    type="text"
                                    name="image_url"
                                    {...register('image_url')}
                                />
                    </div>

                    <div className="label-select">
                        <label className="label-form">
                                Description
                        </label>
                            <textarea
                                placeholder={activity.description}
                                id="description"
                                type="text"
                                name="description"
                                {...register('description')}
                            />
                    </div>

                    <div className="label-select">
                        <label className="label-form">
                                Adresse
                        </label>
                            <input
                                placeholder={activity.address}
                                id="address"
                                type="text"
                                name="address"
                                {...register('address', {
                                    minLength: {
                                        value: 3,
                                        message: '3 caractères minimum',
                                    },
                                })}
                            />
                            {errors.address && <p className="errors">{errors.address.message}</p>}

                    </div>

                        <div className="label-select">
                        <label className="label-form">
                                Ville
                        </label>
                            <input
                                placeholder={activity.city}
                                id="city"
                                type="text"
                                name="city"
                                {...register('city', {
                                    minLength: {
                                        value: 3,
                                        message: '3 caractères minimum',
                                    },
                                })}
                            />
                            {errors.city && <p className="errors">{errors.city.message}</p>}
                        </div>

                        <div className="label-select">
                            <label>
                                Code postal
                            </label>
                            <input
                                placeholder={activity.zip_code}
                                id="zip_code"
                                type="number"
                                name="zip_code"
                                {...register('zip_code', {
                                    pattern: {
                                        value: /^[0-9]{5}$/,
                                        message: 'Format du code postal invalide',
                                    },
                                })}
                            />
                            {errors.zip_code && <p className="errors">{errors.zip_code.message}</p>}
                        </div>
                        <div className="field">
                        <label className="label-select">
                                Jour de l&apos;activité
                                <select
                                    id="day"
                                    {...register('day')}
                                >
                                    <option value="Lundi">Lundi</option>
                                    <option value="Mardi">Mardi</option>
                                    <option value="Mercredi">Mercredi</option>
                                    <option value="Jeudi">Jeudi</option>
                                    <option value="Vendredi">Vendredi</option>
                                    <option value="Samedi">Samedi</option>
                                    <option value="Dimanche">Dimanche</option>

                                </select>
                        </label>

                        <label className="label-select">
                                Heure de début de l&apos;activité
                                <input
                                    id="start_time"
                                    placeholder={activity.start_time}
                                    type="text"
                                    name="start_time"
                                    {...register('start_time', {
                                        minLength: {
                                            value: 3,
                                            message: '3 caractères minimum',
                                        },
                                    })}
                                />
                                {errors.start_time && <p className="errors">{errors.start_time.message}</p>}

                        </label>
                        <label className="label-select">
                                Heure de fin de l&apos;activité
                                <input
                                    id="end_time"
                                    placeholder={activity.end_time}
                                    type="text"
                                    name="end_time"
                                    {...register('end_time', {
                                        minLength: {
                                            value: 3,
                                            message: '3 caractères minimum',
                                        },
                                    })}
                                />
                                {errors.end_time && <p className="errors">{errors.end_time.message}</p>}
                        </label>
                        </div>
                        {' '}
                        <div className="label-select">
                    <label className="label-form">
                                Tarif
                    </label>
                            <input
                                placeholder={activity.price}
                                id="price"
                                type="number"
                                name="price"
                                {...register('price', {
                                    minLength: {
                                        value: 1,
                                        message: '1 caractère minimum',
                                    },
                                })}
                            />
                            {errors.price && <p className="errors">{errors.price.message}</p>}
                        </div>
                        <div className="label-select">
                            <label className="label-form">
                                Type de tarif
                                <select
                                    id="price_type"
                                    {...register('price_type')}
                                >
                                    <option value="la séance">la séance</option>
                                    <option value="par mois">par mois</option>
                                    <option value="par an">par an</option>
                                    <option value="par trimestre">par trimestre</option>

                                </select>

                            </label>
                        </div>
                        <div className="label-select">
                            <label className="label-form">
                                Genre
                                <select
                                    id="gender"
                                    {...register('gender')}
                                >
                                <option value="Masculin">Masculin</option>
                                <option value="Féminin">Féminin</option>
                                <option value="Mixte">Mixte</option>

                                </select>
                            </label>
                        </div>
                            <div className="label-select">
                            <label className="label-select">
                                Niveau
                                <select
                                    id="level"
                                    {...register('level')}
                                >
                                    <option value="Débutant">Débutant</option>
                                    <option value="Tous niveaux">Tous niveaux</option>
                                    <option value="Confirmé">Confirmé</option>

                                </select>
                            </label>
                            </div>
                        <div className="field">
                            <Button
                                type="submit"
                                className="ui color1 button"
                            >
                                Modifier

                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
ModifActivity.propTypes = {
    token: PropTypes.string.isRequired,
};

export default React.memo(ModifActivity);

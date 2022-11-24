/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function DayFilter({
  MondaySelect,
  TuesdaySelect,
  WednesdaySelect,
  ThursdaySelect,
  FridaySelect,
  SaturdaySelect,
  SundaySelect,
}) {
  const [slectMonday, setSlectMonday] = useState('');
  const [selectTuesday, setSelectTuesday] = useState('');
  const [selectWednsday, setSelectWednsday] = useState('');
  const [selectThursday, setSelectThursday] = useState('');
  const [selectFriday, setSelectFriday] = useState('');
  const [selectSaturday, setSlectSaturday] = useState('');
  const [selectSunday, setSelectSunday] = useState('');

  useEffect(() => {
    MondaySelect(slectMonday);
    TuesdaySelect(selectTuesday);
    WednesdaySelect(selectWednsday);
    ThursdaySelect(selectThursday);
    FridaySelect(selectFriday);
    SaturdaySelect(selectSaturday);
    SundaySelect(selectSunday);
  }, []);

  MondaySelect(slectMonday);
  TuesdaySelect(selectTuesday);
  WednesdaySelect(selectWednsday);
  ThursdaySelect(selectThursday);
  FridaySelect(selectFriday);
  SaturdaySelect(selectSaturday);
  SundaySelect(selectSunday);

  const handleChangeMonday = (e) => {
    if (e.target.checked) {
      setSlectMonday('Lundi');
    }
    else {
      setSlectMonday('');
    }
  };

  const handleChangeTuesday = (e) => {
    if (e.target.checked) {
      setSelectTuesday('Mardi');
    }
    else {
      setSelectTuesday('');
    }
  };

  const handleChangeWednesday = (e) => {
    if (e.target.checked) {
      setSelectWednsday('Mercredi');
    }
    else {
      setSelectWednsday('');
    }
  };

  const handleChangeThursday = (e) => {
    if (e.target.checked) {
      setSelectThursday('Jeudi');
    }
    else {
      setSelectThursday('');
    }
  };

  const handleChangeFriday = (e) => {
    if (e.target.checked) {
      setSelectFriday('Vendredi');
    }
    else {
      setSelectFriday('');
    }
  };

  const handleChangeSaturday = (e) => {
    if (e.target.checked) {
      setSlectSaturday('Samedi');
    }
    else {
      setSlectSaturday('');
    }
  };

  const handleChangeSunday = (e) => {
    if (e.target.checked) {
      setSelectSunday('Dimanche');
    }
    else {
      setSelectSunday('');
    }
  };

  return (
    <div>
      <h1 className="level-title">Jours de disponibilité</h1>

      <div className="level-container">
        <form>
          <div className="cat action">
            <label>
              <input
                type="checkbox"
                value="1"
                id="opt-in"
                onChange={handleChangeMonday}
              />
              <span>Lundi</span>
            </label>
          </div>
        </form>

        <div className="cat action">
          <label>
            <input
              type="checkbox"
              value="1"
              id="opt-in"
              onChange={handleChangeTuesday}
            />
            <span>Mardi</span>
          </label>
        </div>

        <div className="cat action">
          <label>
            <input
              type="checkbox"
              value="1"
              id="opt-in"
              onChange={handleChangeWednesday}
            />
            <span>Mercredi</span>
          </label>
        </div>
        <div className="cat action">
          <label>
            <input
              type="checkbox"
              value="1"
              id="opt-in"
              onChange={handleChangeThursday}
            />
            <span>Jeudi</span>
          </label>
        </div>
        <div className="cat action">
          <label>
            <input
              type="checkbox"
              value="1"
              id="opt-in"
              onChange={handleChangeFriday}
            />
            <span>Vendredi</span>
          </label>
        </div>

        <div className="cat action">
          <label>
            <input
              type="checkbox"
              value="1"
              id="opt-in"
              onChange={handleChangeSaturday}
            />
            <span>Samedi</span>
          </label>
        </div>
        <div className="cat action">
          <label>
            <input
              type="checkbox"
              value="1"
              id="opt-in"
              onChange={handleChangeSunday}
            />
            <span>Dimanche</span>
          </label>
        </div>
      </div>
    </div>
  );
}

DayFilter.propTypes = {
  MondaySelect: PropTypes.func,
  TuesdaySelect: PropTypes.func,
  WednesdaySelect: PropTypes.func,
  ThursdaySelect: PropTypes.func,
  FridaySelect: PropTypes.func,
  SaturdaySelect: PropTypes.func,
  SundaySelect: PropTypes.func,

};

DayFilter.defaultProps = {
  MondaySelect: '',
  TuesdaySelect: '',
  WednesdaySelect: '',
  ThursdaySelect: '',
  FridaySelect: '',
  SaturdaySelect: '',
  SundaySelect: '',

};

export default React.memo(DayFilter);

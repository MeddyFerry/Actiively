/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DayFilter from '../aloneFilter/DayFilter';
import LevelFilter from '../aloneFilter/LevelFilter';
import GenderFilter from '../aloneFilter/GenderFilter';
import './filtersStyles.scss';

function FiltersList({
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday,
  FirstLevel,
  SecondLevel,
  ThirdLevel,
  FirstGender,
  SecondGender,
  ThirdGender,
}) {
// Hook created to manage  filters' parameters to hide :
  const [hiden, ishiden] = useState('false');

  const handleChangeFilter = () => {
    ishiden(!hiden);
  };
  // feature to manage day's filter
  const handleMonday = (slectMonday) => {
    Monday(slectMonday);
  };
  const handleTuesday = (selectTuesday) => {
    Tuesday(selectTuesday);
  };
  const handleWednesday = (selectWednsday) => {
    Wednesday(selectWednsday);
  };
  const handleThursday = (selectThursday) => {
    Thursday(selectThursday);
  };
  const handleFriday = (selectFriday) => {
    Friday(selectFriday);
  };
  const handleSaturday = (selectSaturday) => {
    Saturday(selectSaturday);
  };
  const handleSunday = (selectSunday) => {
    Sunday(selectSunday);
  };

  // feature to manage level's filter
  const handleFirstLevel = (selectFirstLevel) => {
    FirstLevel(selectFirstLevel);
  };
  const handleSecondLevel = (selectSecondLevel) => {
    SecondLevel(selectSecondLevel);
  };
  const handleThirdLevel = (selectThirdLevel) => {
    ThirdLevel(selectThirdLevel);
  };

  // feature to manage gender's filter

  const handleFirstGender = (selectFirstGender) => {
    FirstGender(selectFirstGender);
  };
  const handleSecondGender = (selectSecondGender) => {
    SecondGender(selectSecondGender);
  };
  const handleThirdGender = (selectThirdGender) => {
    ThirdGender(selectThirdGender);
  };

  return (
    <div className="filters-container">
      <button
        type="button"
        className="filters-styles"
        onClick={handleChangeFilter}
      >
        Filtres
      </button>

      {!hiden && (
      <div className="filters-container">
        <DayFilter
          MondaySelect={handleMonday}
          TuesdaySelect={handleTuesday}
          WednesdaySelect={handleWednesday}
          ThursdaySelect={handleThursday}
          FridaySelect={handleFriday}
          SaturdaySelect={handleSaturday}
          SundaySelect={handleSunday}
        />
        <LevelFilter
          FirstLevelSelect={handleFirstLevel}
          SecondLevelSelect={handleSecondLevel}
          ThirdLevelSelect={handleThirdLevel}
        />
        <GenderFilter
          FirstGenderSelect={handleFirstGender}
          SecondGenderSelect={handleSecondGender}
          ThirdGenderSelect={handleThirdGender}
        />
      </div>
      )}
    </div>
  );
}

FiltersList.propTypes = {
  Monday: PropTypes.func,
  Tuesday: PropTypes.func,
  Wednesday: PropTypes.func,
  Thursday: PropTypes.func,
  Friday: PropTypes.func,
  Saturday: PropTypes.func,
  Sunday: PropTypes.func,
  FirstLevel: PropTypes.func,
  SecondLevel: PropTypes.func,
  ThirdLevel: PropTypes.func,
  FirstGender: PropTypes.func,
  SecondGender: PropTypes.func,
  ThirdGender: PropTypes.func,
};

FiltersList.defaultProps = {
  Monday: '',
  Tuesday: '',
  Wednesday: '',
  Thursday: '',
  Friday: '',
  Saturday: '',
  Sunday: '',
  FirstLevel: '',
  SecondLevel: '',
  ThirdLevel: '',
  FirstGender: '',
  SecondGender: '',
  ThirdGender: '',
};

export default React.memo(FiltersList);

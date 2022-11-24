import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FiltersList from './Filters/filters/FiltersList';
import PostsList from './Posts/Posts/PostsList';
import './activityListStyles.css';

function ActivityList({
  results,
}) {
  // Hook created to manage parametres of day's filter:
  const [checkMonday, setCheckMonday] = useState('');
  const [checkTuesday, setCheckTuesdayd] = useState('');
  const [checkWednesday, setCheckWednesday] = useState('');
  const [checkThursday, setCheckThursday] = useState('');
  const [checkFriday, setCheckFriday] = useState('');
  const [checSaturday, setChecSaturday] = useState('');
  const [checkSunday, setCheckSunday] = useState('');

  // Hook created to manage parametres of level's filter:
  const [checkFirstLevel, setCheckFirstLevel] = useState('');
  const [checkSecondLevel, setCheckSecondtLevel] = useState('');
  const [checkThirdLevel, setCeckThirdLevel] = useState('');

  // Hook created to manage parametres of gender's filter:

  const [checkFirstGender, setCheckFirstGender] = useState('');
  const [checkSecondGender, setCheckSecondGender] = useState('');
  const [checkThirdGender, setCeckThirdGender] = useState('');

  // day's filters parametre function

  const handleMonday = (slectMonday) => {
    setCheckMonday(slectMonday);
  };
  const handleTuesday = (selectTuesday) => {
    setCheckTuesdayd(selectTuesday);
  };
  const handleWednsday = (selectWednsday) => {
    setCheckWednesday(selectWednsday);
  };
  const handleThursday = (selectThursday) => {
    setCheckThursday(selectThursday);
  };
  const handleFriday = (selectFriday) => {
    setCheckFriday(selectFriday);
  };
  const handleSaturday = (electSaturday) => {
    setChecSaturday(electSaturday);
  };
  const handleSunday = (selectSunday) => {
    setCheckSunday(selectSunday);
  };

  // level's filters parametre function
  const handleFirstLevel = (selectFirstLevel) => {
    setCheckFirstLevel(selectFirstLevel);
  };
  const handleSecondLevel = (selectSecondLeve) => {
    setCheckSecondtLevel(selectSecondLeve);
  };
  const handleThirdLevel = (selectThirdLevel) => {
    setCeckThirdLevel(selectThirdLevel);
  };

  // gender's filters parametre function
  const handleFirstGender = (selectFirstGender) => {
    setCheckFirstGender(selectFirstGender);
  };
  const handleSecondGender = (selectSecondGender) => {
    setCheckSecondGender(selectSecondGender);
  };
  const handleThirdGender = (selectThirdGender) => {
    setCeckThirdGender(selectThirdGender);
  };

  // function to mange array for props:
  const arr = results;
  const day1 = checkMonday;
  const day2 = checkTuesday;
  const day3 = checkWednesday;
  const day4 = checkThursday;
  const day5 = checkFriday;
  const day6 = checSaturday;
  const day7 = checkSunday;
  const gender1 = checkFirstGender;
  const gender2 = checkSecondGender;
  const gender3 = checkThirdGender;
  const level1 = checkFirstLevel;
  const level2 = checkSecondLevel;
  const level3 = checkThirdLevel;

  function data(table) {
    const isdayfiltrenotactive = (
      day1 === ''
    && day2 === ''
    && day3 === ''
    && day4 === ''
    && day5 === ''
    && day6 === ''
    && day7 === ''
    );

    const gendrefiltrenotactive = (
      gender1 === ''
    && gender2 === ''
    && gender3 === ''
    );
    const levelfiltrenotactive = (
      level1 === ''
    && level2 === ''
    && level3 === ''
    );
    const rightData = table.filter((el) => {
      const isvalid = (isdayfiltrenotactive || (
        el.day === day1
    || el.day === day2
    || el.day === day3
    || el.day === day4
    || el.day === day5
    || el.day === day6
    || el.day === day7
      ))
&& (gendrefiltrenotactive || (
  el.gender === gender1
    || el.gender === gender2
    || el.gender === gender3
))
&& (levelfiltrenotactive || (
  el.level === level1
    || el.level === level2
    || el.level === level3
));
      return isvalid;
    });
    return rightData;
  }

  const result = data(arr);

  return (
    <div>
      <div className="container-activity">
        <FiltersList
          Monday={handleMonday}
          Tuesday={handleTuesday}
          Wednesday={handleWednsday}
          Thursday={handleThursday}
          Friday={handleFriday}
          Saturday={handleSaturday}
          Sunday={handleSunday}
          FirstLevel={handleFirstLevel}
          SecondLevel={handleSecondLevel}
          ThirdLevel={handleThirdLevel}
          FirstGender={handleFirstGender}
          SecondGender={handleSecondGender}
          ThirdGender={handleThirdGender}
        />
        <PostsList
          results={result}
        />
      </div>
    </div>
  );
}

ActivityList.propTypes = {
  results: PropTypes.arrayOf(PropTypes.shape({
    activity_name: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    day: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    image_url: PropTypes.string.isRequired,
    level: PropTypes.string.isRequired,
    organism_name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    price_type: PropTypes.string.isRequired,
    zip_code: PropTypes.string.isRequired,
  }).isRequired).isRequired,
};

export default React.memo(ActivityList);

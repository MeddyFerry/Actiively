/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

function GenderFilter({
  FirstGenderSelect,
  SecondGenderSelect,
  ThirdGenderSelect,
}) {
  const [selectFirstGender, setSelectFirstGender] = useState('');
  const [selectSecondGender, setSelectSecondtGender] = useState('');
  const [selectThirdGender, setSelectThirdGender] = useState('');

  FirstGenderSelect(selectFirstGender);
  SecondGenderSelect(selectSecondGender);
  ThirdGenderSelect(selectThirdGender);

  const handleChangeFirstGender = (e) => {
    if (e.target.checked) {
      setSelectFirstGender('Mixte');
    }
    else {
      setSelectFirstGender('');
    }
  };

  const handleChangeSecondeGender = (e) => {
    if (e.target.checked) {
      setSelectSecondtGender('Féminin');
    }
    else {
      setSelectSecondtGender('');
    }
  };

  const handleChangeThirdGender = (e) => {
    if (e.target.checked) {
      setSelectThirdGender('Masculin');
    }
    else {
      setSelectThirdGender('');
    }
  };
  return (
    <div>
      <h1 className="level-title">Genre</h1>
      <div className="level-container">
        <div className="cat action">
          <label>
            <input
              type="checkbox"
              value="1"
              id="opt-in"
              onChange={handleChangeFirstGender}
            />
            <span>Mixte</span>
          </label>
        </div>
        <div className="cat action">
          <label>
            <input
              type="checkbox"
              value="1"
              id="opt-in"
              onChange={handleChangeSecondeGender}
            />
            <span>Féminin</span>
          </label>
        </div>

        <div className="cat action">
          <label>
            <input
              type="checkbox"
              value="1"
              id="opt-in"
              onChange={handleChangeThirdGender}
            />
            <span>Masculin</span>
          </label>
        </div>

      </div>
    </div>

  );
}
GenderFilter.propTypes = {
  FirstGenderSelect: PropTypes.func,
  SecondGenderSelect: PropTypes.func,
  ThirdGenderSelect: PropTypes.func,
};

GenderFilter.defaultProps = {
  FirstGenderSelect: '',
  SecondGenderSelect: '',
  ThirdGenderSelect: '',

};

export default React.memo(GenderFilter);

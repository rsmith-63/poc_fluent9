import '../styles/styles.css'; // Import the CSS file
import React, { useState } from 'react';
import { Radio, RadioGroup, useId } from '@fluentui/react-components';
import { adv__styles } from '../styles/AdvRadioGroupStyles';


export const AdvRadioGroup = () => {
  const classes = adv__styles();
  const labelId = useId('label');

  const handleRadioInputChange = (event) => {
    setRadioInput(event.target.value);
  };
  const [radioInput, setRadioInput] = useState('');

  return (
    <div className={classes.adv__radioGroup}>
      <div>
        <RadioGroup layout='horizontal-stacked' aria-labelledby={labelId}>
          <Radio value='all' onChange={handleRadioInputChange} label='ALL' />
          <Radio value='stat' onChange={handleRadioInputChange} label='Stat' />
          <Radio
            value='non-stat'
            onChange={handleRadioInputChange}
            label='Non-Stat'
          />
        </RadioGroup>
      </div>
    </div>
  );
};

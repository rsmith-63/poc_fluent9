import React, { useState } from 'react';
import { Checkbox } from '@fluentui/react-components';
import { Label, Button, Input } from '@fluentui/react-components';
import { DatePicker } from '@fluentui/react-datepicker-compat';
import { MpowerDialog } from '../components/MpowerDialog';
import { AdvRadioGroup } from '../components/AdvRadioGroup';
import { mergeClasses } from '@fluentui/react-components';
import { Field } from '@fluentui/react-components';
import {
  FluentProvider,
  webLightTheme,
  webDarkTheme,
} from '@fluentui/react-components';

import '../styles/styles.css'; // Import the CSS file
import { formStyles } from '../styles/formStyles';

export const AdvancedSearch = () => {
  // get class names from the formStyles object stylesheet
  const classes = formStyles();

  const [textCheckboxs, setTextCheckboxs] = useState({});
  const [dateCheckboxs, setDateCheckboxs] = useState({
    date1: '',
    date2: '',
  });
  const [checkboxCheckboxs, setCheckboxCheckboxs] = useState({
    checkbox1: false,
    checkbox2: false,
    checkbox3: false,
    checkbox4: false,
    checkbox5: false,
    checkbox6: false,
  });
  const [radioCheckbox, setRadioCheckbox] = useState('');

  const handleTextCheckboxChange = (event) => {
    const { name, value } = event.target;
    setTextCheckboxs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDateCheckboxChange = (event) => {
    const { name, value } = event.target;
    setDateCheckboxs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckboxCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckboxCheckboxs((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleRadioCheckboxChange = (event) => {
    setRadioCheckbox(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted:', {
      ...textCheckboxs,
      ...dateCheckboxs,
      ...checkboxCheckboxs,
      radioCheckbox,
    });
  };

  return (
    <FluentProvider theme={webLightTheme}>
      <form onSubmit={handleSubmit} className={classes.formStyle}>
        <h3>Find reports that have...</h3>
        <div className={classes.formStyle__input}>
          <Label htmlFor='inputField1'>All these words::</Label>
          <Input
            id='inputField1'
            type='text'
            name='inputField1'
            value={textCheckboxs.inputField1}
            onChange={handleTextCheckboxChange}
          />
        </div>
        <div className={classes.formStyle__input}>
          <Label htmlFor='inputField2'>All these words::</Label>
          <Input
            id='inputField2'
            type='text'
            name='inputField2'
            value={textCheckboxs.inputField2}
            onChange={handleTextCheckboxChange}
          />
        </div>
        <div className={classes.formStyle__input}>
          <Label htmlFor='inputField3'>All these words::</Label>
          <Input
            id='inputField3'
            type='text'
            name='inputField3'
            value={textCheckboxs.inputField3}
            onChange={handleTextCheckboxChange}
          />
        </div>
        <h3>Don't show reports that have...</h3>
        <span>(requires that you filled out at least one box above)</span>
        <div className={classes.formStyle__input}>
          <Label htmlFor='inputField1'>Any of these unwanted words::</Label>
          <Input
            id='inputField1'
            type='text'
            name='inputField1'
            value={textCheckboxs.inputField1}
            onChange={handleTextCheckboxChange}
          />
        </div>
        <h3>Date Range</h3>
        <div>
          <Field label='Start Date' className={classes.formStyle__control}>
            <DatePicker
              type='date'
              name='Start Date'
              value={dateCheckboxs.date1}
              onChange={handleDateCheckboxChange}
            />
          </Field>
          <Field label='End Date' className={classes.formStyle__control}>
            <DatePicker
              type='date'
              name='End Dateat'
              value={dateCheckboxs.date2}
              onChange={handleDateCheckboxChange}
            />
          </Field>
        </div>
        <h3>Select modalities....</h3>
        <Label>
          Modality:
          <div>
            <Label htmlFor='checkbox1'>CP</Label>
            <Checkbox type='checkbox' id='checkbox1' />
            <Label htmlFor='checkbox2'>CT</Label>
            <Checkbox type='checkbox' id='checkbox2' />
            <Label htmlFor='checkbox3'>DF</Label>
            <Checkbox type='checkbox' id='checkbox3' />
            <Label htmlFor='checkbox4'>MG</Label>
            <Checkbox type='checkbox' id='checkbox4' />
            <Label htmlFor='checkbox5'>MR</Label>
            <Checkbox type='checkbox' id='checkbox5' />
            <Label htmlFor='checkbox6'>NM</Label>
            <Checkbox type='checkbox' id='checkbox6' />
          </div>
          <div>
            <Label htmlFor='checkbox7'>PT</Label>
            <Checkbox type='checkbox' id='checkbox7' />
            <Label htmlFor='checkbox8'>US</Label>
            <Checkbox type='checkbox' id='checkbox8' />

            <Label htmlFor='checkbox9'>XA</Label>
            <Checkbox type='checkbox' id='checkbox9' />
          </div>
        </Label>
        <h3>Patient...</h3>
        <div>
          <Label>
            Emergency
            <Checkbox
              type='checkbox'
              name='checkbox1'
              checked={checkboxCheckboxs.checkbox1}
              onChange={handleCheckboxCheckboxChange}
            />
          </Label>
          <Label>
            Inpatient
            <Checkbox
              type='checkbox'
              name='checkbox1'
              checked={checkboxCheckboxs.checkbox1}
              onChange={handleCheckboxCheckboxChange}
            />
          </Label>
          <Label>
            Outpatient
            <Checkbox
              type='checkbox'
              name='checkbox1'
              checked={checkboxCheckboxs.checkbox1}
              onChange={handleCheckboxCheckboxChange}
            />
          </Label>
        </div>
        <h3>Select study...</h3>
        <div className={classes.formStyle__examType__group}>
          <Button type='button'>Select Exam Types</Button>
          <Label htmlFor='examModifier' className={classes.formStyle__examType__item}>Exam Modifier:</Label>
          <Input
            type='text'
            id='examModifier'
            name='Exam Modifier:'
            value={textCheckboxs.Checkbox6}
            onChange={handleTextCheckboxChange}
          />
          <Button type='button' className={classes.formStyle__examType__item}>Select CPT Codes</Button>
        </div>
        <AdvRadioGroup />
        <h3>Ordered by...</h3>
        <Button type='button'>Select Provider</Button>
        <h3> Reported by... </h3>
        <Button type='button'>Select Provider</Button>
        <h3> Measurements... </h3>
        <Button type='button'>Select Measurements</Button>
        <h3> AI Observations... </h3>
        <Label size='medium'>Select AI Observations</Label>
        <div>
          <MpowerDialog />
        </div>
        <h3>QC Events...</h3>
        <Button type='button'>Select Critical Events</Button>
        <Button type='button'>Select Mismatch Events</Button>
        <Button type='submit'>Search</Button>
      </form>
    </FluentProvider>
  );
};

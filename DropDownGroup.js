import { useId } from "@fluentui/react-hooks";
import { Dropdown, Option } from "@fluentui/react-components";
import { makeStyles } from "@fluentui/react-components";
import { IconButton } from "./IconButton";
import { Delete24Filled } from "@fluentui/react-icons";
import { AddCircleFilled } from "@fluentui/react-icons";
import { useContext, useState,useRef } from "react";

import {
  RowDataContext,
  DeleteRowContext,
  AddRowContext,
  //HistoryContext,
} from "../context/DiaglogContext";

const useStyles = makeStyles({
  container: {
    display: "flex",
    alignItems: "center",
    flexGrow: 1,
  },
  dropdown: {
    marginRight: "8px",
  },
});

export const DropDownGroup = (props) => {
  const classes = useStyles();
  const dropdownId = useId("dropdown");
  const options = useContext(RowDataContext);
  const onDelete = useContext(DeleteRowContext);
  const handleAdd = useContext(AddRowContext);
  const dropdownRef = useRef(null);
  
  //const handleHistory = useContext(HistoryContext);

  
  const findOption = (options, word) => {
    let outerIndex = -1;
    let innerIndex = -1;
  
    outerIndex = options.findIndex((innerArray) =>
      innerArray.some((option) => option.text === word)
    );
  
    if (outerIndex !== -1) {
      innerIndex = options[outerIndex].findIndex((option) => option.text === word);
    }
  
    return { outerIndex, innerIndex };
  };
  
  let currentIndex = options.length - 1;
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [optionValues, setOptionValues] = useState([]);
  
  const UpdateSelectedOptions= (index, newValue) => {
    const newArray = [...selectedOptions];
    newArray[index] = newValue;
    setSelectedOptions(newArray);
  };
  const updateValues = (index, newValue) => {
    const newArray = [...optionValues];
    newArray[index] = newValue;
    setOptionValues(newArray);
  };
  

  const onOptionSelect = (ev, data) => {
    
    const result =  findOption(options, data.optionText);

    console.log(` result ${JSON.stringify(result)}`);
    updateValues(result.outerIndex, data.optionText);
    UpdateSelectedOptions(result.outerIndex, data.selectedOptions);

    
  };
  
  const getOptionList = (options) => {
    return options?.map((option) => {
      return <Option key={option.key}>{option.text}</Option>;
    });
  };
  const logData = (option, index) => {
    console.log(` 
    option we are working with passed in from dialog
     ${JSON.stringify(option)}  
     index we are working from options.map 
     ${index}`);
    
  };

  console.log(` option Value from state ${optionValues}`);

  return (
    <>
      <div className={classes.container}>
        {options.map((option, index) => {
          currentIndex = index;
          
          
          const optionsArray = getOptionList(option);
          logData(option, index);

          return createDropdown(
            classes,
            index,
            onOptionSelect,
            optionValues,
            selectedOptions,
            props,
            optionsArray,
            dropdownId,
            dropdownRef
          );
        })}
        <IconButton
          iconVal={<Delete24Filled />}
          Tooltiptext="Delete AI Observations"
          click={() => onDelete(currentIndex)}
          id={`${dropdownId}`}
        />
      </div>
      <div>
        <IconButton
          iconVal={<AddCircleFilled />}
          Tooltiptext="Add AI Observations"
          click={() => handleAdd(currentIndex)}
        />
      </div>
    </>
  );
};
function createDropdown(
  classes,
  index,
  onOptionSelect,
  optionValues,
  selectedOptions,
  props,
  optionsArray,
  dropdownId,
  dropdownRef
) {
  
  
  return (
   
    <Dropdown
      key={`${dropdownId}-${index}`}
      className={classes.dropdown}
      id={`${index}`}
      ref={dropdownRef}
      onOptionSelect={onOptionSelect}
      selectedOptions={selectedOptions[index]}
      value={optionValues[index]}
      {...props}
    >
      {optionsArray}
    </Dropdown>
  
  );
}

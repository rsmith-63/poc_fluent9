import { useState } from "react";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { AddCircleFilled, Delete24Filled } from "@fluentui/react-icons";
import { DropDownGroup } from "../components/DropDownGroup";
import { Button } from "@fluentui/react-button";
import { IconButton } from "../components/IconButton";
import { ButtonDialog } from "../components/ButtonDialog";
import { OptGroup } from "../components/OptGroup";

  
export const TestPage = () => {
  const [prevSelectedOptions, setSelectedOptions] = useState([]);

  const options = [
    [
      { key: "1", text: "Option 1" },
      { key: "2", text: "Option 2" },
      { key: "3", text: "Option 3" },
    ],
    [
      { key: "4", text: "Option 4" },
      { key: "5", text: "Option 5" },
      { key: "6", text: "Option 6" },
    ],
    [
      { key: "7", text: "Option 7" },
      { key: "8", text: "Option 8" },
      { key: "9", text: "Option 9" },
    ],
  ];


  const DeletebuttonClick = (index) => {
    console.log("Delete button clicked");
  };
  const AddbuttonClick = (index) => {
    console.log("Add button clicked");
  };

  const handleDelete = (index) => {
    setSelectedOptions((prevSelectedOptions) =>
      prevSelectedOptions.filter((_, i) => i !== index)
    );
  };

  const handleAdd = () => {
    setSelectedOptions((prevSelectedOptions) => [
      ...prevSelectedOptions,
      options[0],
    ]);
  };
  
  return (
    <FluentProvider theme={webLightTheme}>
    <div>
      <h1>Test Page New Styling</h1>
      <div>
      <ButtonDialog title="Select AI Observations" >
          <DropDownGroup  />
        </ButtonDialog>
        
        <IconButton iconVal={<AddCircleFilled />} Tooltiptext="Add AI Observations"  click={() => AddbuttonClick()}/>
        <IconButton iconVal={<Delete24Filled />} Tooltiptext="Delete AI Observations"  click={() => DeletebuttonClick()}/>

      </div>
      <div>
        <Button icon={<AddCircleFilled />} onClick={handleAdd}>
          Add Dropdown Group
        </Button>
        {prevSelectedOptions.map((selectedOption, index) => (
          <DropDownGroup
            key={index}
            options={options[1]}
            onDelete={() => handleDelete(index)}
          />
        ))}
      </div>
    </div>
    </FluentProvider>
  );
};
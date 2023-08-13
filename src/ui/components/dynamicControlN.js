import React, { useState } from "react";
import { DefaultButton, IconButton } from "@fluentui/react/lib/Button";
import { AddCircleFillIcon, DeleteIcon } from "@fluentui/react-icons";
import { Stack } from "@fluentui/react/lib/Stack";

const DynamicControl = (props) => {
  const [values, setValues] = props.useValues;
  const addControl = () => {
    setValues([...values, { value: "" }]);
  };

  const removeControl = (index: number) => {
    const newControls = [...values];
    newControls.splice(index, 1);
    setValues(newControls);
  };

  const handleComponentChange = (
    name,
    index,
    value
  ) => {
    const newControls = [...values];
    newControls[index][name] = value ? value : "";
    setValues(newControls);
  };
  const Comp = props.component;
  return (
    <Stack tokens={{ childrenGap: 10 }}>
      {values.map((value, index) => (
        <Stack key={index} tokens={{ childrenGap: 10 }}>
          <Comp index={index} value={value}  fun={handleComponentChange}/>
          <IconButton
            iconProps={{ iconName: "Delete" }}
            Tooltiptext="Delete/Remove"
            onClick={() => removeControl(index)}
          />
        </Stack>
      ))}
      <DefaultButton iconProps={{ iconName: "Add" }} onClick={addControl}>
        Add Component
      </DefaultButton>
    </Stack>
  );
};

export { DynamicControl };

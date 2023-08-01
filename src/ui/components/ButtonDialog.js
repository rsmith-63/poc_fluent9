import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogContent,
  DialogBody,
  DialogActions,
  Button,
  Divider,
} from "@fluentui/react-components";

import { useState,useEffect } from "react";

import { buttonDialogStyles } from "../styles/ButtonDialogStyles";
import {
  RowDataContext,
  DeleteRowContext,
  AddRowContext,
  HistoryContext,
} from "../context/DiaglogContext";
import { options, newRow } from "./TestData/ButtonDialog_testData";
import { data as newData } from "./TestData/ButtonDialog_testData";


console.log(`  data ${JSON.stringify(newData)}`);
console.log(`  newRow ${JSON.stringify(newRow)}`);
console.log(`  options ${JSON.stringify(options)}`);

//const newData = data;
// const getOptionsByRow = (rowId) => {
//   const row = newData.find((item) => item.rowId === rowId);
//   return row ? row.options : [];
// };

// const updateOptionsByRow = (rowId, newOptions) => {
//   const index = newData.findIndex((item) => item.rowId === rowId);
//   if (index !== -1) {
//     newData[index].rowId = newOptions.rowId;
//     newData[index].options = newOptions;
//   }
// };

export const ButtonDialog = ({ title, children }) => {
  const classes = buttonDialogStyles();
  const [open, setOpen] = useState(false);
  const [rowId, setRowId] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(newData);
    setSelectedOptions(options);
  }, [])

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [history, setHistory] = useState([]);

  //const nextRow = getOptionsByRow(1);
  //console.log(`nextRow ${JSON.stringify(nextRow)}`);

  //updateOptionsByRow(1, options[0]);
  //console.log(` updateOptionsByRow data ${JSON.stringify(data)}`);

  console.log(` befor updateData data ${JSON.stringify(data)}`);
  const updateData = (rowId, newOptions, newRow) => {
    setData((prevData) => {
      const index = prevData.findIndex((item) => item.rowId === rowId);
      if (index !== -1) {
        const newData = [...prevData];
        newData[index].options = newOptions;
        return newData;
      } else {
        return prevData.concat(newRow);
      }
    });
  };
  //updateData(3, getOptionsByRow(3), newRow);
  //console.log(` updateData data ${JSON.stringify(data)}`);

  const handleDelete = (index) => {
    setSelectedOptions((selectedOptions) =>
      selectedOptions.filter((_, i) => i !== index)
    );
  };

  const handleAdd = (index) => {
    setSelectedOptions((selectedOptions) => [
      ...selectedOptions,
      options[index],
    ]);
  };

  const handleHistoryUpdate = (dropdownId, newValue) => {
    const newArray = [...history];
    newArray[dropdownId] = newValue;
    setHistory(newArray);
  };

  const historyObject = {
    handleHistory: handleHistoryUpdate,
    history: history,
  };

  return (
    <Dialog open={open} onOpenChange={(event, data) => setOpen(data.open)}>
      <DialogTrigger disableButtonEnhancement>
        <Button>{title}</Button>
      </DialogTrigger>
      <DialogSurface className={classes.buttonDialog__surface}>
        <DialogBody>
          <DialogTitle>{title}</DialogTitle>
          <DialogContent className={classes.buttonDialog__content}>
            <>
              <HistoryContext.Provider value={historyObject}>
                <RowDataContext.Provider value={data[rowId]}>
                  <DeleteRowContext.Provider value={handleDelete}>
                    <AddRowContext.Provider value={handleAdd}>
                      {children}
                    </AddRowContext.Provider>
                  </DeleteRowContext.Provider>
                </RowDataContext.Provider>
              </HistoryContext.Provider>
            </>
            <Divider appearance="strong" />
          </DialogContent>

          <DialogActions className={classes.buttonDialog__actions}>
            <DialogTrigger disableButtonEnhancement>
              <Button size="small" appearance="secondary">
                OK
              </Button>
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

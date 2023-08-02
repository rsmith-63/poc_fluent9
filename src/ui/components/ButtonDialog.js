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

import { useState,useEffect,useRef } from "react";

import { buttonDialogStyles } from "../styles/ButtonDialogStyles";
import {
  RowDataContext,
  DeleteRowContext,
  AddRowContext,
  HistoryContext,
} from "../context/DiaglogContext";
import { newRow } from "./TestData/ButtonDialog_testData";
import { data as newData } from "./TestData/ButtonDialog_testData";


console.log(`  data ${JSON.stringify(newData)}`);
console.log(`  newRow ${JSON.stringify(newRow)}`);


export const ButtonDialog = ({ title, children }) => {
  const classes = buttonDialogStyles();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const rowIdRef = useRef(0);

  useEffect(() => {
    setData(newData);
    
  }, [])

  
  
    const [history, setHistory] = useState([]);

  
  console.log(` befor updateData data ${JSON.stringify(data)}`);
  
  
  const handleDelete = (index,rowID) => {
    // setSelectedOptions((selectedOptions) =>
    //   selectedOptions.filter((_, i) => i !== index)
    // );
  };

  const handleAdd = (index, rowID) => {
    // Increment the value of rowIdRef
    rowIdRef.current += 1;
  
    // Use rowId to get the correct object from the data array
    const selectedRow = data.find((row) => row.rowId === rowIdRef.current);
  
     //Set the selected options to the options of the selected row

    const newArray = [...data];
     setData(newArray);
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
                <RowDataContext.Provider value={data[rowIdRef.current]}>
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

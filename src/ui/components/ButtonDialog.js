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
import{options, data, newRow} from "./TestData/ButtonDialog_testData";
//inport { options, rowdata, newRow } from "./TestData/ButtonDialog_testData";
import { useState } from "react";

import { buttonDialogStyles } from "../styles/ButtonDialogStyles";
import {
  RowDataContext,
  DeleteRowContext,
  AddRowContext,
  HistoryContext
} from "../context/DiaglogContext";


const getOptionsByRow = (rowId) => {
  const row = data.find((item) => item.rowId === rowId);
  return row ? row.options : [];
};

const updateOptionsByRow = (rowId, newOptions) => {
  const index = data.findIndex((item) => item.rowId === rowId);
  if (index !== -1) {
    data[index].rowId = newOptions.rowId;
    data[index].options = newOptions;
    

  }
};



export const ButtonDialog = ({ title, children }) => {
  const classes = buttonDialogStyles();
  const [open, setOpen] = useState(false);
  const [rowId, setRowId] = useState(0);
 
  const [selectedOptions, setSelectedOptions] = useState(data[rowId].options);
  const [history, setHistory] = useState([]);
   const nextRow = getOptionsByRow(1);
   console.log(`nextRow ${JSON.stringify(nextRow)}`);
   updateOptionsByRow(1, options[0]);
   console.log(` updateOptionsByRow data ${JSON.stringify(data)}`);
  
  const handleDelete = (index) => {
    
    setSelectedOptions((selectedOptions) =>
      selectedOptions.filter((_, i) => i !== index)
    );
    
  };

  const handleAdd = (index) => {
    
    setSelectedOptions((selectedOptions) => [...selectedOptions, options[index]]);
    
  };

  const handleHistoryUpdate= (dropdownId, newValue) => {
    const newArray = [...history];
    newArray[dropdownId] = newValue;
    setHistory(newArray);
  }
  
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
              <RowDataContext.Provider value={selectedOptions}>
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

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

import { useState } from "react";

import { buttonDialogStyles } from "../styles/ButtonDialogStyles";
import {
  RowDataContext,
  DeleteRowContext,
  AddRowContext,
  HistoryContext
} from "../context/DiaglogContext";

const options = [
  [
    { key: "1", text: "Option 1 first set" },
    { key: "2", text: "Option 2" },
    { key: "3", text: "Option 3" },
  ],
  [
    { key: "4", text: "Option 4 second set" },
    { key: "5", text: "Option 5" },
    { key: "6", text: "Option 6" },
  ],
  [
    { key: "7", text: "Option 7 third set" },
    { key: "8", text: "Option 8" },
    { key: "9", text: "Option 9" },
  ],
];

export const ButtonDialog = ({ title, children }) => {
  const classes = buttonDialogStyles();
  const [open, setOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(options);
  const [history, setHistory] = useState([]);
  

  const handleDelete = (index) => {
    console.log(` handleDelete options ${JSON.stringify(selectedOptions)} index ${index}`)
    setSelectedOptions((selectedOptions) =>
      selectedOptions.filter((_, i) => i !== index)
    );
    console.log(`handleDelete end selectedOptions ${JSON.stringify(selectedOptions)} index ${index}`)
  };

  const handleAdd = (index) => {
    console.log(` handleAdd options 
    ${JSON.stringify(selectedOptions)} 
    index ${index}`)
    setSelectedOptions((selectedOptions) => [...selectedOptions, options[index]]);
    console.log(` handleAdd end selectedOptions ${JSON.stringify(selectedOptions)} index ${index}`)
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

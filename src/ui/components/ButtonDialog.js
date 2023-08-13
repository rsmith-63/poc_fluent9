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
  DropDownListContext,
} from "../context/DiaglogContext";
import { newRow } from "./TestData/ButtonDialog_testData";
import { data as newData } from "./TestData/ButtonDialog_testData";


console.log(`  data ${JSON.stringify(newData)}`);
console.log(`  newRow ${JSON.stringify(newRow)}`);


export const ButtonDialog = ({ title, children }) => {
  const classes = buttonDialogStyles();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [dropdowns, setDropdowns] = useState([])
  const rowIdRef = useRef(0);

  useEffect(() => {
    setData(newData);
    
  }, [])

  useEffect(() => {
    console.log(`   dropdowns list  updated ${JSON.stringify(dropdowns)}`);
  
    
  }, [dropdowns])

  
  
    const [history, setHistory] = useState([]);

    function handleCreateDropdowns(newDropdowns) {
      if(newDropdowns){
      setDropdowns([...dropdowns, ...newDropdowns]);
      }
    }
 // console.log(` after handleCreateDropdowns dropdowns list ${JSON.stringify(dropdowns)}`);
  
  
  const handleDelete = (index,rowID) => {
    // setSelectedOptions((selectedOptions) =>
    //   selectedOptions.filter((_, i) => i !== index)
    // );
  };

  const handleAdd = () => {
    
    
  
    // Use rowId to get the correct object from the data array
    //const selectedRow = data.find((row) => row.rowId === rowIdRef.current);
  
     //Set the selected options to the options of the selected row

    const newArray = [...data];

    
     // Increment the value of rowIdRef
     if(rowIdRef.current < data.length){
      rowIdRef.current = rowIdRef.current + 1;
     }
      else{
        rowIdRef.current = 0;
      }
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

  function dropdownById(ref,value) {
    ref.value = value;
    //console.log(` after dropdownById dropdowns list ${JSON.stringify(dropdowns)}`);
  
    // const updatedDropdowns = dropdowns.map((dropdown) => {
    //   if (dropdown.props.id == id) {
    //     return dropdown;
    //   } else {
    //     return dropdown;
    //   }
    // });
    // setDropdowns(updatedDropdowns);
  }
  const DropDownList = {
    dropdowns: dropdowns,
    handleCreateDropdowns: handleCreateDropdowns,
    update : dropdownById,

  }

  

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
            <DropDownListContext.Provider value={DropDownList}>
              <HistoryContext.Provider value={historyObject}>
                <RowDataContext.Provider value={data[rowIdRef.current]}>
                  <DeleteRowContext.Provider value={handleDelete}>
                    <AddRowContext.Provider value={handleAdd}>
                      {children}
                    </AddRowContext.Provider>
                  </DeleteRowContext.Provider>
                </RowDataContext.Provider>
              </HistoryContext.Provider>
            </DropDownListContext.Provider>
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

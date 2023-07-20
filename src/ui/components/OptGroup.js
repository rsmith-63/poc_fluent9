import {
    Dropdown,
    makeStyles,
    Option,
    OptionGroup,
    shorthands,
    useId,
    
  } from "@fluentui/react-components";
  import  {useContext} from "react";
  import { RowDataContext, DeleteRowContext, AddRowContext } from "../context/DiaglogContext";

  
  const useStyles = makeStyles({
    root: {
      // Stack the label above the field with a gap
      display: "grid",
      gridTemplateRows: "repeat(1fr)",
      justifyItems: "start",
      ...shorthands.gap("2px"),
      maxWidth: "400px",
    },
  });
  
  
  
  export const OptGroup = (props) => {
    const dropdownId = useId("dropdown-OptGroup");
    const options = useContext(RowDataContext);
    const getOptionList = (options) => {
      return options.map((option) => {
        return <Option key={option.key}>{option.text}</Option>;
      });
    };
    //const water = ["Fish", "Jellyfish", "Octopus", "Seal"];
    const styles = useStyles();
    const optionsArray =  getOptionList(options[0]);

    return (
            <div className={styles.root}>

        {/* <label id={dropdownId}>observation</label> */}
        <Dropdown
          aria-labelledby={dropdownId}
          placeholder="Select an observation"
          {...props}
        >
          {optionsArray}
          
        </Dropdown>
      </div>
    );
  };
  
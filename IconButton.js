import { makeStyles, Button, Tooltip } from "@fluentui/react-components";
import * as React from "react";


const useStyles = makeStyles({
  wrapper: {
    columnGap: "15px",
    display: "flex",
  },
});

export const IconButton = ({iconVal,Tooltiptext,click }) => {
 const styles = useStyles();

  return (
    <div className={styles.wrapper}>   
      <Tooltip content={Tooltiptext} relationship="label">
        <Button icon={iconVal} onClick={click}/>
      </Tooltip>
    </div>
  );
};

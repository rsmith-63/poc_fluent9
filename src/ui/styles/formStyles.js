import { makeStyles } from "@fluentui/react-components";
import { tokens } from "@fluentui/react-theme";
import { shorthands } from "@griffel/react";

export const formStyles = makeStyles({
  formStyle:{
    maxWidth: '100%',
    ...shorthands.margin('20px'),
  }, 
  formStyle__input: {
    display: 'flex',
    marginBottom: '10px',
    marginTop: '10px',
    flexWrap: 'wrap',
    columnGap: '40px',
    rowGap: '5px',
  } ,
  formStyle__control: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: '40px',
    maxWidth: '400px',
    marginTop: '10px',
  },
  formStyle__examType__group: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '400px',
  },
  formStyle__examType__item: {
    marginTop: '10px',
    maxWidth: '400px',
  },
});

import { makeStyles,shorthands } from "@fluentui/react-components";

export const buttonDialogStyles = makeStyles({
    buttonDialog__surface: {
        ...shorthands.padding('20px', '20px', '10px'),
        minWidth: 'min(90%, 900px)',
      },
      buttonDialog__content: {
        display: 'grid',
        gridGap: '10px',
      },
      buttonDialog__actions: {
        justifySelf: 'start',
        gridColumnStart: '1',
      }
});
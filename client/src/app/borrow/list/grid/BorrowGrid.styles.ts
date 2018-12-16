import { Theme, createStyles } from '@material-ui/core';

import { verticalScroll, flex, flexColumn, cursorPointer } from '@styles/index';
import { TextDecorationStyles } from '../../../../styles/utils';

export const BorrowGridStyles = (theme: Theme) =>
  createStyles({
    flexColumn,
    flex,
    verticalScroll,
    borrowList: {
      padding: theme.spacing.unit
    },
    borrowListItem: {
      ...flexColumn,
      ...cursorPointer,
      padding: theme.spacing.unit
    },
    borrowListItemLink: {
      ...flexColumn,
      ...flex,
      textDecoration: TextDecorationStyles.None
    }
  });

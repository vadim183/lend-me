import { CSSProperties } from '@material-ui/core/styles/withStyles';

export enum FlexStyles {
  Center = 'center',
  Column = 'column',
  Row = 'row',
  Flex = 'flex',
  Start = 'flex-start',
  Stretch = 'stretch'
}

export const flexColumn: CSSProperties = {
  display: FlexStyles.Flex,
  flexDirection: FlexStyles.Column
};

export const flex: CSSProperties = {
  flex: 1
};

export const flexCenterCenter: CSSProperties = {
  alignItems: FlexStyles.Center,
  justifyContent: FlexStyles.Center
};

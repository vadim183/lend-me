import { Important } from './common';
import { CSSProperties } from '@material-ui/core/styles/withStyles';

export enum DisplayStyles {
  None = 'none'
}

export const hide: CSSProperties = {
  display: `${DisplayStyles.None} ${Important}`
};

export enum OverflowStyles {
  Auto = 'auto',
  Hidden = 'hidden'
}

export const verticalScroll: CSSProperties = {
  overflowY: OverflowStyles.Auto,
  overflowX: OverflowStyles.Hidden
};

export enum CursorStyles {
  Pointer = 'pointer'
}

export const cursorPointer: CSSProperties = {
  cursor: CursorStyles.Pointer
};

export enum TextDecorationStyles {
  None = 'none'
}

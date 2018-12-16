import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { LinearProgress, createStyles, withStyles } from '@material-ui/core';

import { ItemViewModel } from '@domain/items';
import {
  selectItemsData,
  selectItemsStatus,
  createGetItemsAction,
  GetItemsAction,
  StoreState
} from '@store/index';
import { WorkStatus } from '@shared/index';
import { flexColumn, flex, hide, StyleClassesProps } from '@styles/index';

import { BorrowGrid } from '@app/borrow/list/grid/BorrowGrid';
import { InjectorContext, IInjectorContext } from 'src/injector.context';

const BorrowListStyles = () =>
  createStyles({
    flexColumn,
    flex,
    hide
  });

interface BorrowListProps extends StyleClassesProps {
  items: ItemViewModel[];
  isLoading: boolean;
  getItems: () => void;
}

class UnconnectedBorrowList extends React.Component<BorrowListProps> {
  static contextType = InjectorContext;
  context: IInjectorContext;

  private classes = this.props.classes;

  componentDidMount() {
    this.props.getItems();
  }

  render() {
    return (
      <div className={`${this.classes.flex} ${this.classes.flexColumn}`}>
        <LinearProgress
          className={`${!this.props.isLoading ? this.classes.hide : ''}`}
        />
        <BorrowGrid
          items={this.props.items}
          getItems={this.props.getItems}
          context={this.context}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: StoreState) => ({
  items: selectItemsData(state),
  isLoading: selectItemsStatus(state) === WorkStatus.InProgress
});

const mapDispatchToProps = (dispatch: Dispatch<GetItemsAction>) => ({
  getItems: () => dispatch(createGetItemsAction())
});

const UnstyledBorrowList = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedBorrowList);

export const BorrowList = withStyles(BorrowListStyles)(UnstyledBorrowList);

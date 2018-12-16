import * as React from 'react';
import { Link } from 'react-router-dom';

import { Grid, withStyles } from '@material-ui/core';

import { ItemViewModel } from '@domain/items';
import { EventDefinition } from '@core/events';

import { StyleClassesProps } from '@styles/index';

import { BorrowItem } from './item/BorrowItem';

import { IInjectorContext } from 'src/injector.context';
import { BorrowGridStyles } from './BorrowGrid.styles';

interface BorrowGridProps extends StyleClassesProps {
  items: ItemViewModel[];
  getItems: () => void;
  context: IInjectorContext;
}

class UnstyledBorrowGrid extends React.Component<BorrowGridProps> {
  private scrollingElement: Element;

  private scrollingDefinition: EventDefinition;

  private classes = this.props.classes;

  componentDidMount() {
    this.scrollingDefinition = this.props.context.scrollingDefinitionCreator.createScrollingDefinition(
      this.scrollingElement,
      () => this.props.getItems()
    );

    this.scrollingDefinition.setup();
  }

  componentWillUnmount() {
    this.scrollingDefinition.destroy();
  }

  render() {
    return (
      <div
        className={`${this.classes.verticalScroll} ${this.classes.borrowList}`}
        ref={element => (this.scrollingElement = element as Element)}
      >
        <Grid container={true}>
          {this.props.items.map(item => (
            <Grid
              className={this.classes.borrowListItem}
              key={item.id}
              item={true}
              xs={12}
              sm={6}
              lg={3}
              xl={2}
            >
              <Link
                to={`/borrow/details/${item.id}`}
                className={this.classes.borrowListItemLink}
              >
                <BorrowItem item={item} />
              </Link>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

export const BorrowGrid = withStyles(BorrowGridStyles)(UnstyledBorrowGrid);

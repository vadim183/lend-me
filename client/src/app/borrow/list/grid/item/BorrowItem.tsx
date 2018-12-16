import * as React from 'react';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { createStyles, withStyles } from '@material-ui/core';

import { ItemViewModel } from '@domain/items';

import { flex, flexColumn, StyleClassesProps } from '@styles/index';

export const BorrowItemStyles = () =>
  createStyles({
    flexColumn,
    flex,
    borrowItemImage: {
      paddingTop: '56.25%'
    }
  });

interface BorrowItemProps extends StyleClassesProps {
  item: ItemViewModel;
}

const UnstyledBorrowItem = (props: BorrowItemProps) => {
  return (
    <Card className={`${props.classes.flex} ${props.classes.flexColumn}`}>
      <CardMedia
        className={props.classes.borrowItemImage}
        image={props.item.thumbnailUrl}
        title={props.item.description}
      />
      <CardContent className={props.classes.flex}>
        <Typography gutterBottom={true} variant="headline" component="h2">
          {props.item.description}
        </Typography>
        <Typography component="p">{props.item.description}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" href="" target="_blank">
          Borrow this item
        </Button>
      </CardActions>
    </Card>
  );
};

export const BorrowItem = withStyles(BorrowItemStyles)(UnstyledBorrowItem);

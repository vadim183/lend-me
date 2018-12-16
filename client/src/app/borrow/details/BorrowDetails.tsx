import * as React from 'react';
import { match } from 'react-router';

interface BorrowDetailsProps {
  match: match<{ itemId: string }>;
}

export const BorrowDetails = (props: BorrowDetailsProps) => (
  <div>{props.match.params.itemId}</div>
);

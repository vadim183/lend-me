import * as React from 'react';
import * as ReactDOM from 'react-dom';

import 'reflect-metadata';
import 'typeface-roboto';

import './index.scss';

import registerServiceWorker from './registerServiceWorker';
import { Root } from './Root';

ReactDOM.render(<Root />, document.getElementById('root') as HTMLElement);

registerServiceWorker();

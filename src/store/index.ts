import { applyMiddleware, createStore, compose } from 'redux';

import { appMiddleware, coreMiddleware } from './middlewares';
import reducers from './reducers';

export default createStore(
    reducers,
    compose(applyMiddleware(...coreMiddleware, ...appMiddleware))
);

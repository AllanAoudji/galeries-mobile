import errorReportsMiddleware from './errorReportsMiddleware';
import portReportsMiddleware from './portReportsMiddleware';
import resetReportsMiddleware from './resetReportsMiddleware';
import successReportsMiddleware from './successReportsMiddleware';

// eslint-disable-next-line import/prefer-default-export
export const reportsMiddlewares = [
    errorReportsMiddleware,
    portReportsMiddleware,
    resetReportsMiddleware,
    successReportsMiddleware,
];

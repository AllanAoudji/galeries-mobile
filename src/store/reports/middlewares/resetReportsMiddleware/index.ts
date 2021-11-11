import { Middleware } from 'redux';

import { resetReportsLoadingPost } from '#store/reports/actionCreators';
import { REPORTS_RESET } from '#store/reports/actionTypes';

const resetReportsMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== REPORTS_RESET) return;

        dispatch(resetReportsLoadingPost());
    };

export default resetReportsMiddleware;

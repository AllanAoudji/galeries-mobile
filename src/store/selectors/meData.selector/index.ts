import { createSelector } from 'reselect';

export default createSelector(
    (state: Store.Reducer) => state.me.id,
    (state: Store.Reducer) => state.users,
    (id, byId) => {
        const me = id ? byId.byId[id] : null;
        return me || null;
    }
);

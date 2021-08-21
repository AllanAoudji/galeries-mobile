import { createSelector } from 'reselect';

export default (name?: string) =>
    createSelector(
        () => name,
        (state: Store.Reducer) => state.galeries,
        (filter, galeries) => {
            if (filter) {
                return galeries.filters[filter]
                    ? galeries.filters[filter].end
                    : false;
            }
            return galeries.end;
        }
    );

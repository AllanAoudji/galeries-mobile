import { createSelector } from 'reselect';

export default (name?: string) =>
    createSelector(
        () => name,
        (state: Store.Reducer) => state.galeries,
        (filter, galeriesStatus) => {
            if (filter) {
                return galeriesStatus.filters[filter]
                    ? galeriesStatus.filters[filter].status
                    : 'PENDING';
            }
            return galeriesStatus.status;
        }
    );

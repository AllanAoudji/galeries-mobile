import uniqueArray from '#helpers/uniqueArray';
import { PROFILE_PICTURES_SET } from '#store/actions';

const initialState: {
    allIds?: string[];
    byId: { [key: string]: Store.Models.ProfilePicture };
    end: boolean;
    status: Store.Status;
} = {
    byId: {},
    end: false,
    status: 'PENDING',
};

export default (state = initialState, action: Store.Action) => {
    switch (action.type) {
        case PROFILE_PICTURES_SET: {
            const byId = {
                ...state.byId,
                ...((action.payload.data.byId as {
                    [key: string]: Store.Models.ProfilePicture;
                }) || {}),
            };
            const allIds =
                state.allIds || action.payload.data.allIds
                    ? uniqueArray([
                          ...uniqueArray(state.allIds || []),
                          ...uniqueArray(action.payload.data.allIds || []),
                      ]).sort((a, b) => {
                          if (!byId[a] || !byId[b]) return 0;
                          return (
                              +byId[a].autoIncrementId -
                              +byId[b].autoIncrementId
                          );
                      })
                    : undefined;
            const end = action.payload.meta.end || state.end;
            const status = action.payload.data.status || state.status;
            return {
                ...state,
                allIds,
                byId,
                end,
                status,
            };
        }
        default:
            return state;
    }
};

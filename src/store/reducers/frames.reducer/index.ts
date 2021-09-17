import uniqueArray from '#helpers/uniqueArray';
import { FRAMES_SET } from '#store/actions';

const initialState: {
    allIds?: string[];
    byId: { [key: string]: Store.Models.Frame };
    end: boolean;
    status: Store.Status;
} = {
    byId: {},
    end: false,
    status: 'PENDING',
};

export default (state = initialState, action: Store.Action) => {
    switch (action.type) {
        case FRAMES_SET: {
            const byId = {
                ...state.byId,
                ...(action.payload.data.byId || {}),
            };
            const allIds =
                state.allIds || action.payload.data.allIds
                    ? uniqueArray([
                          ...(state.allIds || []),
                          ...(action.payload.data.allIds || []),
                      ]).sort(
                          (a, b) =>
                              new Date(byId[b].createdAt).getTime() -
                              new Date(byId[a].createdAt).getTime()
                      )
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

export const getComment = (getState: () => Store.Reducer, commentId: string) =>
    getState().comments.byId[commentId];
export const getCommentsById = (getState: () => Store.Reducer) =>
    getState().comments.byId;
export const getCommentsLoadingDelete = (getState: () => Store.Reducer) =>
    getState().comments.loading.delete;
export const getCommentsLoadingPost = (getState: () => Store.Reducer) =>
    getState().comments.loading.post;
export const getFrame = (getState: () => Store.Reducer, frameId: string) =>
    getState().frames.byId[frameId];
export const getFramesAllIds = (getState: () => Store.Reducer) =>
    getState().frames.allIds;
export const getFramesById = (getState: () => Store.Reducer) =>
    getState().frames.byId;
export const getFramesEnd = (getState: () => Store.Reducer) =>
    getState().frames.end;
export const getFramesLoadingDelete = (getState: () => Store.Reducer) =>
    getState().frames.loading.delete;
export const getFramesLoadingPost = (getState: () => Store.Reducer) =>
    getState().frames.loading.post;
export const getFramesLoadingPut = (getState: () => Store.Reducer) =>
    getState().frames.loading.put;
export const getFramesPrevious = (getState: () => Store.Reducer) =>
    getState().frames.previous;
export const getFramesStatus = (getState: () => Store.Reducer) =>
    getState().frames.status;
export const getGalerie = (getState: () => Store.Reducer, galerieId: string) =>
    getState().galeries.byId[galerieId];
export const getGalerieFramesAllIds = (
    getState: () => Store.Reducer,
    galerieId: string
) => {
    const galerie = getState().galeries.byId[galerieId];
    if (!galerie || !galerie.frames) return undefined;
    return galerie.frames.allIds;
};
export const getGaleriesEnd = (getState: () => Store.Reducer, name: string) =>
    getState().galeries.end[name];
export const getGaleriesLoadingDelete = (getState: () => Store.Reducer) =>
    getState().galeries.loading.delete;
export const getGaleriesLoadingPost = (getState: () => Store.Reducer) =>
    getState().galeries.loading.post;
export const getGaleriesLoadingPut = (getState: () => Store.Reducer) =>
    getState().galeries.loading.put;
export const getGaleriesPrevious = (
    getState: () => Store.Reducer,
    name: string
) => getState().galeries.previous[name];
export const getGaleriesStatus = (
    getState: () => Store.Reducer,
    name: string
) => getState().galeries.status[name];
export const getLoginStatus = (getState: () => Store.Reducer) =>
    getState().login.status;
export const getLogoutStatus = (getState: () => Store.Reducer) =>
    getState().logout.status;
export const getMe = (getState: () => Store.Reducer) => {
    const meId = getState().me.id;
    if (!meId) return undefined;
    return getState().users.byId[meId];
};
export const getMeId = (getState: () => Store.Reducer) => getState().me.id;
export const getMeStatus = (getState: () => Store.Reducer) =>
    getState().me.status;
export const getProfilePictures = (getState: () => Store.Reducer) =>
    getState().profilePictures;
export const getProfilePicturesLoadingDelete = (
    getState: () => Store.Reducer
) => getState().profilePictures.loading.delete;
export const getProfilePicturesLoadingPost = (getState: () => Store.Reducer) =>
    getState().profilePictures.loading.post;
export const getUsersEnd = (getState: () => Store.Reducer) =>
    getState().users.end;
export const getUsersPrevious = (getState: () => Store.Reducer) =>
    getState().users.previous;
export const getUsersStatus = (getState: () => Store.Reducer) =>
    getState().users.status;
export const getUser = (getState: () => Store.Reducer, userId: string) =>
    getState().users.byId[userId];

import { createSelector } from 'reselect';

const sendBetaKeyStatusIdSelector = (state: Store.Reducer) =>
    state.sendBetaKey.status.id;

// eslint-disable-next-line import/prefer-default-export
export const selectSendBetaKeyStatus = (betaKeyId?: string | null) =>
    createSelector([sendBetaKeyStatusIdSelector], (sendBetaKeyStatudId) => {
        if (!betaKeyId) return undefined;
        return sendBetaKeyStatudId[betaKeyId];
    });

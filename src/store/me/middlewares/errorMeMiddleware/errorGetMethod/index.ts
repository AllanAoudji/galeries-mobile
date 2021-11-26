import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dispatch } from 'redux';

import { resetBetaKeys } from '#store/betaKeys/actionCreators';
import { resetComments } from '#store/comments/actionCreators';
import { resetConfirmAccount } from '#store/confirmAccount/actionCreators';
import { resetFrames } from '#store/frames/actionCreators';
import { resetGaleries } from '#store/galeries/actionCreators';
import { resetGalerieBlackLists } from '#store/galerieBlackLists/actionCreators';
import { resetGaleriePictures } from '#store/galeriePictures/actionCreators';
import { resetGalerieRoles } from '#store/galerieRoles/actionCreators';
import { resetInvitations } from '#store/invitations/actionCreators';
import { resetLikes } from '#store/likes/actionCreators';
import { resetLogin } from '#store/login/actionCreators';
import { resetMe } from '#store/me/actionCreators';
import { resetNotifications } from '#store/notifications/actionCreators';
import { resetProfilePictures } from '#store/profilePictures/actionCreators';
import { resetReports } from '#store/reports/actionCreators';
import { resetResetPassword } from '#store/resetPassword/actionCreators';
import { resetSendBetaKey } from '#store/sendBetaKey/actionCreators';
import { resetSignin } from '#store/signin/actionCreators';
import { resetUsers } from '#store/users/actionCreators';
import { dispatchErrorNotification } from '#store/dispatchers';

const errorGetMethod = (
    dispatch: Dispatch<Store.Action>,
    action: Store.Action
) => {
    AsyncStorage.clear().finally(() => {
        dispatch(resetMe());
        dispatch(resetBetaKeys());
        dispatch(resetComments());
        dispatch(resetConfirmAccount());
        dispatch(resetFrames());
        dispatch(resetGaleries());
        dispatch(resetGalerieBlackLists());
        dispatch(resetGaleriePictures());
        dispatch(resetGalerieRoles());
        dispatch(resetInvitations());
        dispatch(resetLikes());
        dispatch(resetLogin());
        dispatch(resetNotifications());
        dispatch(resetProfilePictures());
        dispatch(resetResetPassword());
        dispatch(resetSendBetaKey());
        dispatch(resetSignin());
        dispatch(resetUsers());
        dispatch(resetReports());
        dispatchErrorNotification(dispatch, action);
    });
};

export default errorGetMethod;

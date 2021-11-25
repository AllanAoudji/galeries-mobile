import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { apiMiddlewares } from './api';
import { betaKeysMiddleware, betaKeysReducer } from './betaKeys';
import { commentsMiddlewares, commentsReducer } from './comments';
import {
    confirmAccountMiddlewares,
    confirmAccountReducers,
} from './confirmAccount';
import { framesMiddlewares, framesReducer } from './frames';
import { galeriesMiddleware, galeriesReducer } from './galeries';
import {
    galerieBlackListsMiddlewares,
    galerieBlackListsReducer,
} from './galerieBlackLists';
import { galerieRolesMiddlewares, galerieRolesReducer } from './galerieRoles';
import { invitationsMiddlewares, invitationsReducer } from './invitations';
import {
    galeriePicturesMiddlwares,
    galeriePicturesReducer,
} from './galeriePictures';
import { likesMiddlewares, likesReducers } from './likes';
import { loginMiddlewares, loginReducer } from './login';
import { logoutMiddlewares, logoutReducer } from './logout';
import { meMiddlewares, meReducer } from './me';
import { notificationReducer } from './notification';
import { notificationsReducer, notificationsMiddleware } from './notifications';
import {
    profilePicturesMiddlewares,
    profilePicturesReducer,
} from './profilePictures';
import { reportsMiddlewares, reportsReducer } from './reports';
import {
    resetPasswordMiddleware,
    resetPasswordReducers,
} from './resetPassword';
import { sendBetaKeyReducers, sendBetaKeyMiddlewares } from './sendBetaKey';
import { signinReducer, signinMiddlewares } from './signin';
import { ticketsReducer, ticketsMiddlewares } from './tickets';
import { usersMiddleware, usersReducer } from './users';

const reducers = combineReducers({
    betaKeys: betaKeysReducer,
    comments: commentsReducer,
    confirmAccount: confirmAccountReducers,
    frames: framesReducer,
    galeries: galeriesReducer,
    galerieBlackLists: galerieBlackListsReducer,
    galeriePictures: galeriePicturesReducer,
    galerieRoles: galerieRolesReducer,
    invitations: invitationsReducer,
    likes: likesReducers,
    login: loginReducer,
    logout: logoutReducer,
    me: meReducer,
    notifications: notificationsReducer,
    notification: notificationReducer,
    profilePictures: profilePicturesReducer,
    reports: reportsReducer,
    resetPassword: resetPasswordReducers,
    sendBetaKey: sendBetaKeyReducers,
    signin: signinReducer,
    tickets: ticketsReducer,
    users: usersReducer,
});

export default createStore(
    reducers,
    composeWithDevTools(
        applyMiddleware(
            ...betaKeysMiddleware,
            ...commentsMiddlewares,
            ...confirmAccountMiddlewares,
            ...framesMiddlewares,
            ...galeriesMiddleware,
            ...galerieBlackListsMiddlewares,
            ...galeriePicturesMiddlwares,
            ...galerieRolesMiddlewares,
            ...invitationsMiddlewares,
            ...likesMiddlewares,
            ...loginMiddlewares,
            ...logoutMiddlewares,
            ...meMiddlewares,
            ...notificationsMiddleware,
            ...profilePicturesMiddlewares,
            ...reportsMiddlewares,
            ...resetPasswordMiddleware,
            ...sendBetaKeyMiddlewares,
            ...signinMiddlewares,
            ...ticketsMiddlewares,
            ...usersMiddleware,
            ...apiMiddlewares
        )
    )
);

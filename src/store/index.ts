import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { apiMiddlewares } from './api';
import { commentsMiddlewares, commentsReducer } from './comments';
import { forgotYourPasswordReducer } from './forgotYourPassword';
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
import {
    profilePicturesMiddlewares,
    profilePicturesReducer,
} from './profilePictures';
import { reportsMiddlewares, reportsReducer } from './reports';
import { signinReducer } from './signin';
import { usersMiddleware, usersReducer } from './users';

const reducers = combineReducers({
    comments: commentsReducer,
    forgotYourPassword: forgotYourPasswordReducer,
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
    notification: notificationReducer,
    profilePictures: profilePicturesReducer,
    reports: reportsReducer,
    signin: signinReducer,
    users: usersReducer,
});

export default createStore(
    reducers,
    composeWithDevTools(
        applyMiddleware(
            ...commentsMiddlewares,
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
            ...profilePicturesMiddlewares,
            ...reportsMiddlewares,
            ...usersMiddleware,
            ...apiMiddlewares
        )
    )
);

import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { apiMiddlewares } from './api';
import { commentsMiddlewares, commentsReducer } from './comments';
import { forgotYourPasswordReducer } from './forgotYourPassword';
import { framesMiddlewares, framesReducer } from './frames';
import { galeriesMiddleware, galeriesReducer } from './galeries';
import {
    galeriePicturesMiddlwares,
    galeriePicturesReducer,
} from './galeriePictures';
import { likesMiddlewares, likesReducers } from './likes';
import { loginMiddlewares, loginReducer } from './login';
import { logoutMiddlewares, logoutReducer } from './logout';
import { meMiddlewares, meReducer } from './me';
import {
    profilePicturesMiddlewares,
    profilePicturesReducer,
} from './profilePictures';
import { signinReducer } from './signin';
import { usersMiddleware, usersReducer } from './users';

const reducers = combineReducers({
    comments: commentsReducer,
    forgotYourPassword: forgotYourPasswordReducer,
    frames: framesReducer,
    galeries: galeriesReducer,
    galeriePictures: galeriePicturesReducer,
    likes: likesReducers,
    login: loginReducer,
    logout: logoutReducer,
    me: meReducer,
    profilePictures: profilePicturesReducer,
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
            ...galeriePicturesMiddlwares,
            ...likesMiddlewares,
            ...loginMiddlewares,
            ...logoutMiddlewares,
            ...meMiddlewares,
            ...profilePicturesMiddlewares,
            ...usersMiddleware,
            ...apiMiddlewares
        )
    )
);

import { applyMiddleware, combineReducers, compose, createStore } from 'redux';

import { apiMiddlewares } from './api';
import { commentsMiddlewares, commentsReducer } from './comments';
import { framesMiddlewares } from './frames';
import { galeriesMiddleware, galeriesReducer } from './galeries';
import {
    galeriePicturesMiddlwares,
    galeriePicturesReducer,
} from './galeriePictures';
import { likesMiddlewares, likesReducers } from './likes';
import { loadingReducer } from './loading';
import { loginMiddlewares, loginReducer } from './login';
import { logoutMiddlewares } from './logout';
import { meMiddlewares, meReducer } from './me';
import {
    profilePicturesMiddlewares,
    profilePicturesReducer,
} from './profilePictures';
import { uiReducer } from './ui';
import { usersMiddleware, usersReducer } from './users';

const reducers = combineReducers({
    comments: commentsReducer,
    galeries: galeriesReducer,
    galeriePictures: galeriePicturesReducer,
    like: likesReducers,
    loading: loadingReducer,
    login: loginReducer,
    me: meReducer,
    profilePictures: profilePicturesReducer,
    ui: uiReducer,
    users: usersReducer,
});

export default createStore(
    reducers,
    compose(
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

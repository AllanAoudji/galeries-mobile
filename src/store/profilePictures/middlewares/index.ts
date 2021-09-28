import deleteProfilePicturesMiddleware from './deleteProfilePicturesMiddleware';
import errorProfilePicturesMiddleware from './errorProfilePicturesMiddleware';
import getProfilePicturesMiddleware from './getProfilePicturesMiddleware';
import postProfilePicturesMiddleware from './postProfilePicturesMiddleware';
import resetProfilePicturesMiddleware from './resetProfilePicturesMiddleware';
import successProfilePicturesMiddleware from './successProfilePicturesMiddleware';

// eslint-disable-next-line import/prefer-default-export
export const profilePicturesMiddlewares = [
    deleteProfilePicturesMiddleware,
    errorProfilePicturesMiddleware,
    getProfilePicturesMiddleware,
    postProfilePicturesMiddleware,
    resetProfilePicturesMiddleware,
    successProfilePicturesMiddleware,
];

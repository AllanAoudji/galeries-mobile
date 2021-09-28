import errorGaleriePictures from './errorGaleriePicturesMiddleware';
import getGaleriePicturesMiddleware from './getGaleriePicturesMiddleware';
import resetGaleriePicturesMiddleware from './resetGaleriePicturesMiddleware';
import successGaleriePicturesMiddleware from './successGaleriePicturesMiddleware';

// eslint-disable-next-line import/prefer-default-export
export const galeriePicturesMiddlwares = [
    errorGaleriePictures,
    getGaleriePicturesMiddleware,
    resetGaleriePicturesMiddleware,
    successGaleriePicturesMiddleware,
];

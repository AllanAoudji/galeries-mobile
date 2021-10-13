import errorGaleriePictures from './errorGaleriePicturesMiddleware';
import getGaleriePicturesMiddleware from './getGaleriePicturesMiddleware';
import putGaleriePicturesMiddleware from './putGaleriePicturesMiddleware';
import resetGaleriePicturesMiddleware from './resetGaleriePicturesMiddleware';
import successGaleriePicturesMiddleware from './successGaleriePicturesMiddleware';

// eslint-disable-next-line import/prefer-default-export
export const galeriePicturesMiddlwares = [
    errorGaleriePictures,
    getGaleriePicturesMiddleware,
    resetGaleriePicturesMiddleware,
    putGaleriePicturesMiddleware,
    successGaleriePicturesMiddleware,
];

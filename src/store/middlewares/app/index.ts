import commentsMiddlewares from './comments.middlewares';
import framesMiddlewares from './frames.middlewares';
import galeriesMiddlewares from './galeries.middlewares';
import galeriePicturesMiddlewares from './galeriePictures.middlewares';
import likesMiddlewares from './likes.middlewares';
import logoutMiddlewares from './logout.middlewares';
import meMiddlewares from './me.middlewares';

export default [
    ...commentsMiddlewares,
    ...framesMiddlewares,
    ...galeriesMiddlewares,
    ...galeriePicturesMiddlewares,
    ...likesMiddlewares,
    ...logoutMiddlewares,
    ...meMiddlewares,
];

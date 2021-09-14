import framesMiddlewares from './frames.middlewares';
import galeriesMiddlewares from './galeries.middlewares';
import likesMiddlewares from './likes.middlewares';
import logoutMiddlewares from './logout.middlewares';
import meMiddlewares from './me.middlewares';

export default [
    ...framesMiddlewares,
    ...galeriesMiddlewares,
    ...likesMiddlewares,
    ...logoutMiddlewares,
    ...meMiddlewares,
];

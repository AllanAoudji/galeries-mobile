import framesMiddlewares from './frames.middlewares';
import galeriesMiddlewares from './galeries.middlewares';
import logoutMiddlewares from './logout.middlewares';
import userMiddlewares from './user.middlewares';

export default [
    ...framesMiddlewares,
    ...galeriesMiddlewares,
    ...logoutMiddlewares,
    ...userMiddlewares,
];

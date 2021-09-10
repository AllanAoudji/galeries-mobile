import framesMiddlewares from './frames.middlewares';
import galeriesMiddlewares from './galeries.middlewares';
import logoutMiddlewares from './logout.middlewares';
import meMiddlewares from './me.middlewares';

export default [
    ...framesMiddlewares,
    ...galeriesMiddlewares,
    ...logoutMiddlewares,
    ...meMiddlewares,
];

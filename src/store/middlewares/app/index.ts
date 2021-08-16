import logoutMiddlewares from './logout.middlewares';
import userMiddlewares from './user.middlewares';

export default [...logoutMiddlewares, ...userMiddlewares];

import apiMiddlewares from './api.middlewares';
import normalizeMiddlewares from './normalize.middlewares';

export default [...normalizeMiddlewares, ...apiMiddlewares];

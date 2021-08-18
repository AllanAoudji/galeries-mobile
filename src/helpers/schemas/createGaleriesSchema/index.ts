import * as Yup from 'yup';

import { ERROR_MESSAGE } from '#helpers/constants';

export default Yup.object().shape({
    description: Yup.string().required(ERROR_MESSAGE.FIELD_IS_REQUIRED),
    name: Yup.string().required(ERROR_MESSAGE.FIELD_IS_REQUIRED),
});

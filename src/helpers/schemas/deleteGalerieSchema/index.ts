import * as Yup from 'yup';

import { ERROR_MESSAGE } from '#helpers/constants';

export default Yup.object().shape({
    name: Yup.string().trim().required(ERROR_MESSAGE.FIELD_IS_REQUIRED),
    password: Yup.string().trim().required(ERROR_MESSAGE.FIELD_IS_REQUIRED),
});

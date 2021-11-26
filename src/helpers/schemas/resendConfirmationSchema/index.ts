import * as Yup from 'yup';

import { ERROR_MESSAGE } from '#helpers/constants';

export default Yup.object().shape({
    email: Yup.string()
        .trim()
        .lowercase()
        .required(ERROR_MESSAGE.FIELD_IS_REQUIRED)
        .email(ERROR_MESSAGE.FIELD_SHOULD_BE_AN_EMAIL),
});

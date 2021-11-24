import * as Yup from 'yup';

import { ERROR_MESSAGE } from '#helpers/constants';

export default Yup.object().shape({
    email: Yup.string()
        .trim()
        .lowercase()
        .email(ERROR_MESSAGE.FIELD_SHOULD_BE_AN_EMAIL),
});

import * as Yup from 'yup';

import { ERROR_MESSAGE, FIELD_REQUIREMENT } from '#helpers/constants';

export default Yup.object().shape({
    body: Yup.string()
        .trim()
        .required(ERROR_MESSAGE.FIELD_IS_REQUIRED)
        .min(
            FIELD_REQUIREMENT.COMMENT_MIN_LENGTH,
            ERROR_MESSAGE.FIELD_MIN_LENGTH(FIELD_REQUIREMENT.COMMENT_MIN_LENGTH)
        )
        .max(
            FIELD_REQUIREMENT.COMMENT_MAX_LENGTH,
            ERROR_MESSAGE.FIELD_MAX_LENGTH(FIELD_REQUIREMENT.COMMENT_MAX_LENGTH)
        ),
});

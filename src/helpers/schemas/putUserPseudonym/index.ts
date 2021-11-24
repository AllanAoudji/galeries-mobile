import * as Yup from 'yup';

import { ERROR_MESSAGE, FIELD_REQUIREMENT } from '#helpers/constants';

export default Yup.object().shape({
    pseudonym: Yup.string()
        .trim()
        .required(ERROR_MESSAGE.FIELD_IS_REQUIRED)
        .min(
            FIELD_REQUIREMENT.PSEUDONYM_MIN_LENGTH,
            ERROR_MESSAGE.FIELD_MIN_LENGTH(
                FIELD_REQUIREMENT.PSEUDONYM_MIN_LENGTH
            )
        )
        .max(
            FIELD_REQUIREMENT.PSEUDONYM_MAX_LENGTH,
            ERROR_MESSAGE.FIELD_MAX_LENGTH(
                FIELD_REQUIREMENT.PSEUDONYM_MAX_LENGTH
            )
        ),
});

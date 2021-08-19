import * as Yup from 'yup';

import { ERROR_MESSAGE, FIELD_REQUIREMENT } from '#helpers/constants';

export default Yup.object().shape({
    description: Yup.string()
        .trim()
        .max(
            FIELD_REQUIREMENT.GALERIE_DESCRIPTION_MAX_LENGTH,
            ERROR_MESSAGE.FIELD_MAX_LENGTH(
                FIELD_REQUIREMENT.GALERIE_DESCRIPTION_MAX_LENGTH
            )
        ),
    name: Yup.string()
        .trim()
        .required(ERROR_MESSAGE.FIELD_IS_REQUIRED)
        .min(
            FIELD_REQUIREMENT.GALERIE_NAME_MIN_LENGTH,
            ERROR_MESSAGE.FIELD_MIN_LENGTH(
                FIELD_REQUIREMENT.GALERIE_NAME_MIN_LENGTH
            )
        )
        .max(
            FIELD_REQUIREMENT.GALERIE_NAME_MAX_LENGTH,
            ERROR_MESSAGE.FIELD_MAX_LENGTH(
                FIELD_REQUIREMENT.GALERIE_NAME_MAX_LENGTH
            )
        ),
});

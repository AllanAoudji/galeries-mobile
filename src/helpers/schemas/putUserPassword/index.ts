import * as Yup from 'yup';

import { ERROR_MESSAGE, FIELD_REQUIREMENT } from '#helpers/constants';

export default Yup.object().shape({
    confirmNewPassword: Yup.string()
        .required(ERROR_MESSAGE.FIELD_IS_REQUIRED)
        .oneOf(
            [Yup.ref('newPassword'), null],
            ERROR_MESSAGE.FIELD_SHOULD_MATCH('password')
        ),
    currentPassword: Yup.string().required(ERROR_MESSAGE.FIELD_IS_REQUIRED),
    newPassword: Yup.string()
        .required(ERROR_MESSAGE.FIELD_IS_REQUIRED)
        .matches(/^\S*$/, ERROR_MESSAGE.FIELD_CANNOT_CONTAIN_SPACES)
        .min(
            FIELD_REQUIREMENT.PASSWORD_MIN_LENGTH,
            ERROR_MESSAGE.FIELD_MIN_LENGTH(
                FIELD_REQUIREMENT.PASSWORD_MIN_LENGTH
            )
        )
        .max(
            FIELD_REQUIREMENT.PASSWORD_MAX_LENGTH,
            ERROR_MESSAGE.FIELD_MAX_LENGTH(
                FIELD_REQUIREMENT.PASSWORD_MAX_LENGTH
            )
        )
        .matches(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{0,}$/,
            ERROR_MESSAGE.FIELD_SHOULD_BE_A_PASSWORD
        ),
});

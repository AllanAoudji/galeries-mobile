import * as Yup from 'yup';

import { ERROR_MESSAGE } from '#helpers/constants';

export default Yup.object().shape({
    deleteAccountSentence: Yup.string().required(
        ERROR_MESSAGE.FIELD_IS_REQUIRED
    ),
    deletePassword: Yup.string().required(ERROR_MESSAGE.FIELD_IS_REQUIRED),
    userNameOrEmail: Yup.string().required(ERROR_MESSAGE.FIELD_IS_REQUIRED),
});

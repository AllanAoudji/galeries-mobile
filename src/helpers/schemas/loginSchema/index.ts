import * as Yup from 'yup';

import { ERROR_MESSAGE } from '#helpers/constants';

export default Yup.object().shape({
    password: Yup.string().required(ERROR_MESSAGE.FIELD_IS_REQUIRED),
    userNameOrEmail: Yup.string().required(ERROR_MESSAGE.FIELD_IS_REQUIRED),
});

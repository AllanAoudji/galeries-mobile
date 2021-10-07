import * as Yup from 'yup';
import { ERROR_MESSAGE, FIELD_REQUIREMENT } from '#helpers/constants';

export default Yup.object().shape({
    description: Yup.string()
        .trim()
        .max(
            FIELD_REQUIREMENT.FRAME_DESCRIPTION_MAX_LENGTH,
            ERROR_MESSAGE.FIELD_MAX_LENGTH(
                FIELD_REQUIREMENT.FRAME_DESCRIPTION_MAX_LENGTH
            )
        ),
});

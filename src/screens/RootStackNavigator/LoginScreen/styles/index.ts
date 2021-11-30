import styled from 'styled-components/native';

import { GLOBAL_STYLE } from '#helpers/constants';
import convertPixelToNum from '#helpers/convertPixelToNum';

const ButtonContainer = styled.View`
    padding: ${({ theme }) =>
        `0 ${theme.spacings.smallest} ${
            GLOBAL_STYLE.FOOTER_LOGGER_HEIGHT +
            convertPixelToNum(theme.spacings.normal)
        }px`};
`;
const ForgotYourPasswordContainer = styled.Pressable`
    align-items: flex-end;
    margin-left: ${({ theme }) => theme.spacings.large};
    margin-top: ${({ theme }) => theme.spacings.smallest};
    padding: ${({ theme }) =>
        `${theme.spacings.smallest} 0 ${theme.spacings.smallest} ${theme.spacings.normal}`};
`;
const ScrollViewStyle = styled.ScrollView`
    padding: ${({ theme }) => `0 ${theme.spacings.normal}`};
`;
const TextContainer = styled.View`
    margin-top: ${({ theme }) => theme.spacings.large};
`;

export {
    ButtonContainer,
    ForgotYourPasswordContainer,
    ScrollViewStyle,
    TextContainer,
};

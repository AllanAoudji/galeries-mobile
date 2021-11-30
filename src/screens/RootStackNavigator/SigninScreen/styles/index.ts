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
const Container = styled.View`
    background-color: ${({ theme }) => theme.colors['secondary-light']};
    flex: 1;
`;
const ScrollViewStyle = styled.ScrollView`
    padding: ${({ theme }) => `0 ${theme.spacings.normal}`};
`;
const TextContainer = styled.View`
    margin-top: ${({ theme }) => theme.spacings.large};
`;

export { ButtonContainer, Container, ScrollViewStyle, TextContainer };

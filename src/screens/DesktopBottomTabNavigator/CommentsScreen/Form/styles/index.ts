import styled from 'styled-components/native';

import { GLOBAL_STYLE } from '#helpers/constants';

type TextInputStyledProps = {
    height: number;
    loading: boolean;
};

const Container = styled.View`
    background-color: ${({ theme }) => theme.colors.secondary};
    bottom: 0;
    left: 0;
    min-height: ${() => `${GLOBAL_STYLE.COMMENTS_FOOTER_HEIGHT}px`};
    padding-left: ${({ theme }) => theme.spacings.small};
    position: absolute;
    right: 0;
`;
const FormContainer = styled.View`
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
`;
const PostButton = styled.Pressable`
    align-items: center;
    align-self: stretch;
    flex-direction: row;
    opacity: 0.5;
    padding: ${({ theme }) => `0 ${theme.spacings.small}`};
`;
const TextInputStyled = styled.TextInput<TextInputStyledProps>`
    background-color: ${({ theme }) => theme.colors['secondary-light']};
    border-bottom-width: 3px;
    border-color: ${({ theme }) => theme.colors['primary-dark']};
    flex: 1;
    height: ${({ height }) => `${height}px`};
    margin: ${({ theme }) =>
        `${theme.spacings.smallest} 0 ${theme.spacings.small}`};
    opacity: ${({ loading }) => (loading ? 0.5 : 1)};
    padding: ${({ theme }) => `10px ${theme.spacings.smallest}`};
`;

export { Container, FormContainer, PostButton, TextInputStyled };

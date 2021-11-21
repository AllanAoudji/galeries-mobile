import styled from 'styled-components/native';
import { GLOBAL_STYLE } from '#helpers/constants';

type ContainerProps = {
    mb?: keyof Style.Spacings;
    mt?: keyof Style.Spacings;
};

const Container = styled.Pressable<ContainerProps>`
    align-items: center;
    background-color: ${({ theme }) => theme.colors.secondary};
    border-color: ${({ theme }) => theme.colors.primary};
    border-radius: 8px;
    border-width: 3px;
    height: ${() => `${GLOBAL_STYLE.MODERATION_NAVIGATION_BUTTON_HEIGHT}px`};
    justify-content: center;
    margin-bottom: ${({ mb, theme }) => (mb ? theme.spacings[mb] : 0)};
    margin-left: ${({ theme }) => theme.spacings.smallest};
    margin-right: ${({ theme }) => theme.spacings.smallest};
    margin-top: ${({ mt, theme }) => (mt ? theme.spacings[mt] : 0)};
`;

// eslint-disable-next-line import/prefer-default-export
export { Container };

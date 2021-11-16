import styled from 'styled-components/native';

type ContainerProps = {
    color: keyof Style.Colors;
    disable?: boolean;
    mb?: keyof Style.Spacings;
    ml?: keyof Style.Spacings;
    mr?: keyof Style.Spacings;
    mt?: keyof Style.Spacings;
    small?: boolean;
    variant?: Style.Variant.Button;
};

const Container = styled.Pressable<ContainerProps>`
    align-items: center;
    background-color: ${({ color, theme, variant }) =>
        variant === 'stroke'
            ? theme.colors['secondary-light']
            : theme.colors[color]};
    border-color: ${({ color, theme }) => theme.colors[color]};
    border-radius: ${({ small }) => (small ? '5px' : '50px')};
    border-width: ${({ variant }) => (variant === 'stroke' ? '2px' : '0px')};
    flex-direction: row;
    height: ${({ small }) => (small ? '33px' : '36px')};
    justify-content: center;
    margin-bottom: ${({ mb, theme }) => (mb ? theme.spacings[mb] : 0)};
    margin-left: ${({ ml, theme }) => (ml ? theme.spacings[ml] : 0)};
    margin-right: ${({ mr, theme }) => (mr ? theme.spacings[mr] : 0)};
    margin-top: ${({ mt, theme }) => (mt ? theme.spacings[mt] : 0)};
    padding: 0 6px;
    opacity: ${({ disable }) => (disable ? 0.5 : 1)};
`;

// eslint-disable-next-line import/prefer-default-export
export { Container };

import styled from 'styled-components/native';

type ContainerProps = {
    pb?: number;
    pt?: number;
};

const Container = styled.View<ContainerProps>`
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: ${({ pb, pt, theme }) =>
        `${pt || 0}px ${theme.spacings.normal} ${pb || 0}px`};
`;

const Button = styled.Pressable`
    margin-top: ${({ theme }) => theme.spacings.small};
    padding: ${({ theme }) => `11px ${theme.spacings.small}`};
    border-width: 1px;
    border-color: ${({ theme }) => theme.colors.primary};
    border-radius: 5px;
`;

// eslint-disable-next-line import/prefer-default-export
export { Button, Container };

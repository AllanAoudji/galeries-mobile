import styled from 'styled-components/native';

type ContainerProps = {
    seen: boolean;
};

const Container = styled.Pressable<ContainerProps>`
    background-color: ${({ seen, theme }) =>
        `${seen ? theme.colors['secondary-light'] : theme.colors.secondary}`};
    margin: ${({ theme }) => `${theme.spacings.smallest} 0`};
    padding: ${({ theme }) => `${theme.spacings.smallest}`};
`;

// eslint-disable-next-line import/prefer-default-export
export { Container };

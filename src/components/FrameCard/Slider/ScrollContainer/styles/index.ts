import styled from 'styled-components/native';

type ContainerProps = {
    size: number;
};

const BookMarkContainer = styled.View`
    bottom: ${({ theme }) => theme.spacings.smallest};
    position: absolute;
    right: ${({ theme }) => theme.spacings.smallest};
`;
const Container = styled.Pressable<ContainerProps>`
    height: ${({ size }) => `${size}px`};
    width: ${({ size }) => `${size}px`};
`;

// eslint-disable-next-line import/prefer-default-export
export { BookMarkContainer, Container };

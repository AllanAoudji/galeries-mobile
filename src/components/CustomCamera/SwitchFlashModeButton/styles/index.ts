import styled from 'styled-components/native';

type ContainerProps = {
    paddingTop?: number;
};

const Container = styled.View<ContainerProps>`
    padding-top: ${({ paddingTop }) => (paddingTop ? `${paddingTop}px` : 0)};
    position: absolute;
    right: 0;
    top: 0;
    z-index: 100;
`;

// eslint-disable-next-line import/prefer-default-export
export { Container };

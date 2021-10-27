import styled from 'styled-components/native';

type ContainerProps = {
    paddingTop?: number;
};

const Container = styled.View<ContainerProps>`
    flex-direction: row;
    padding-top: ${({ paddingTop }) => `${paddingTop || 0}px`};
    position: absolute;
    right: 0;
    top: 0;
    width: 100%;
    z-index: 10;
`;

// eslint-disable-next-line import/prefer-default-export
export { Container };

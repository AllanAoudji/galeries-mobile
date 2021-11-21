import styled from 'styled-components/native';

type AbsoluteTopContainerProps = {
    paddingTop: number | undefined;
};

const Container = styled.View<AbsoluteTopContainerProps>`
    flex-direction: row;
    justify-content: flex-start;
    left: 0;
    padding-top: ${({ paddingTop }) => `${paddingTop || 0}px`};
    position: absolute;
    right: 0;
    top: 0;
    z-index: 2;
`;

// eslint-disable-next-line import/prefer-default-export
export { Container };

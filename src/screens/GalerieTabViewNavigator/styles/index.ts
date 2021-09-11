import styled from 'styled-components/native';

type AbsoluteTopContainerProps = {
    currentHeight: number | undefined;
};

const AbsoluteCoverPicture = styled.View`
    bottom: 0;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
`;
const AbsoluteTopContainer = styled.View<AbsoluteTopContainerProps>`
    flex-direction: row;
    justify-content: flex-start;
    left: 0;
    padding-top: ${({ currentHeight }) => `${currentHeight || 0}px`};
    position: absolute;
    right: 0;
    top: 0;
    z-index: 2;
`;
const Container = styled.View`
    flex: 1;
`;

export { AbsoluteCoverPicture, AbsoluteTopContainer, Container };

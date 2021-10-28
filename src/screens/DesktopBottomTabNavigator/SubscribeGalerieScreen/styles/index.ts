import styled from 'styled-components/native';

type BackButtonContainerProps = {
    paddingTop?: number;
};

const BackButtonContainer = styled.View<BackButtonContainerProps>`
    left: 0;
    padding-top: ${({ paddingTop }) => (paddingTop ? `${paddingTop}px` : 0)};
    position: absolute;
    top: 0;
    z-index: 100;
`;
const Container = styled.View`
    background-color: #000;
    flex: 1;
    justify-content: center;
`;

export { BackButtonContainer, Container };

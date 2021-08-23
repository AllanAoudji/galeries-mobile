import styled from 'styled-components/native';

type Props = {
    currentHeight: number | undefined;
};

const LogoContainer = styled.View<Props>`
    align-items: center;
    bottom: 0;
    justify-content: center;
    left: 0;
    padding-top: ${({ currentHeight }) => `${currentHeight || 0}px`};
    position: absolute;
    right: 0;
    top: 0;
`;

export default LogoContainer;

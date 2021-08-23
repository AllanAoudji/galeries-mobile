import styled from 'styled-components/native';

type Props = {
    currentHeight: number | undefined;
};

const PictogramContainer = styled.Pressable<Props>`
    position: absolute;
    top: 0;
    bottom: 0;
    justify-content: center;
    padding: ${({ currentHeight, theme }) =>
        `${currentHeight || 0}px ${theme.spacings.small} 0`};
    z-index: 1;
`;

export default PictogramContainer;

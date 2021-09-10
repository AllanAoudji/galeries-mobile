import styled from 'styled-components/native';

type Props = {
    currentHeight?: number;
};

const DarkBackground = styled.View<Props>`
    background-color: rgba(0, 0, 0, 0.2);
    padding: ${({ currentHeight, theme }) =>
        `${currentHeight || 0}px ${theme.spacings.small} 6px`};
    justify-content: flex-end;
    flex: 1;
`;

export default DarkBackground;

import styled from 'styled-components/native';

type LinearGradiantStyledProps = {
    size: number;
};

const ActivityIndicatorContainer = styled.View`
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
`;
const DotsContainer = styled.View`
    align-items: center;
    flex-direction: row;
    height: 22px;
    justify-content: center;
`;
const LinearGradiantStyled = styled.View<LinearGradiantStyledProps>`
    height: ${({ size }) => `${size}px`};
    width: ${({ size }) => `${size}px`};
`;

export { ActivityIndicatorContainer, DotsContainer, LinearGradiantStyled };

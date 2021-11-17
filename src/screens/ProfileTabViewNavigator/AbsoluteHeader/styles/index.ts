import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

type AbsoluteTopContainerProps = {
    paddingTop: number | undefined;
};
type PseudonymContainerProps = {
    paddingTop?: number;
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
const PseudonymContainer = styled(Animated.View)<PseudonymContainerProps>`
    align-items: flex-end;
    bottom: 0;
    justify-content: center;
    left: 0;
    overflow: hidden;
    position: absolute;
    right: 0;
    top: 0;
    padding-top: ${({ paddingTop }) => `${paddingTop || 0}px`};
    padding-right: ${({ theme }) => theme.spacings.small};
`;

// eslint-disable-next-line import/prefer-default-export
export { Container, PseudonymContainer };

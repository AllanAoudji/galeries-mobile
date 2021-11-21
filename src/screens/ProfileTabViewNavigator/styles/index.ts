import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

type PseudonymContainerProps = {
    paddingTop?: number;
};

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
export { PseudonymContainer };

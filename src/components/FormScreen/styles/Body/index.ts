import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';

const Body = styled(Animated.View)`
    background-color: ${({ theme }) => theme.colors['secondary-light']};
    padding-top: ${({ theme }) => theme.spacings.small};
    padding-left: ${({ theme }) => theme.spacings.normal};
    padding-right: ${({ theme }) => theme.spacings.normal};
    position: absolute;
    width: 100%;
    bottom: 0;
`;

export default Body;

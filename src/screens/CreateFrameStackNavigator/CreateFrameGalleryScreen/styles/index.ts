import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

const AddPicturesButtonContainer = styled.View`
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    padding: ${({ theme }) =>
        `${theme.spacings.smallest} ${theme.spacings.small} 0`};
`;
const ButtonContainer = styled.View`
    width: 25%;
`;
const Container = styled.View`
    background-color: ${({ theme }) => theme.colors['secondary-light']};
    flex: 1;
`;
const Header = styled(Animated.View)`
    background-color: ${({ theme }) => theme.colors['secondary-light']};
    padding-bottom: ${({ theme }) => theme.spacings.smallest};
    position: absolute;
    width: 100%;
    z-index: 10;
`;

export { AddPicturesButtonContainer, ButtonContainer, Container, Header };

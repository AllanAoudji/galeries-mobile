import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';
import { GLOBAL_STYLE } from '#helpers/constants';

const AddPicturesButtonContainer = styled.View`
    align-items: flex-end;
    flex-direction: row;
    height: ${() => `${GLOBAL_STYLE.FRAME_GALLERY_HEADER}px`};
    justify-content: space-between;
    padding: ${({ theme }) =>
        `0 ${theme.spacings.small} ${theme.spacings.smallest}`};
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
    position: absolute;
    width: 100%;
    z-index: 10;
`;

export { AddPicturesButtonContainer, ButtonContainer, Container, Header };

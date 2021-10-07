import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

type ContainerProps = {
    paddingTop?: number;
};

const BottonContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    padding: ${({ theme }) => `0 ${theme.spacings.small}`};
`;
const Container = styled(Animated.View)<ContainerProps>`
    background-color: rgba(0, 0, 0, 0.5);
    flex: 1;
    padding-top: ${({ paddingTop }) => `${paddingTop || 0}px`};
`;
const FooterContainer = styled.View`
    background-color: ${({ theme }) => theme.colors['secondary-light']};
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    padding: ${({ theme }) => `${theme.spacings.smallest} 0`};
`;
const HeaderContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;
const PressableContainer = styled.Pressable`
    flex: 1;
    justify-content: space-between;
`;

const DescriptionContainer = styled.View`
    margin: ${({ theme }) =>
        `0 ${theme.spacings.normal} ${theme.spacings.small}`};
`;

// eslint-disable-next-line import/prefer-default-export
export {
    BottonContainer,
    Container,
    DescriptionContainer,
    FooterContainer,
    HeaderContainer,
    PressableContainer,
};

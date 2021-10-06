import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

type ContainerProps = {
    paddingTop?: number;
};

const Container = styled(Animated.View)<ContainerProps>`
    background-color: rgba(0, 0, 0, 0.5);
    flex: 1;
    padding-top: ${({ paddingTop }) => `${paddingTop || 0}px`};
`;

const FooterContainer = styled.View`
    background-color: ${({ theme }) => theme.colors['secondary-light']};
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    padding: ${({ theme }) => `${theme.spacings.small}`};
    margin: ${({ theme }) => `0 ${theme.spacings.smallest}`};
`;

const HeaderContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

const LikeContainer = styled.View`
    align-items: flex-end;
    border-top-width: 2px;
    border-top-color: ${({ theme }) => theme.colors.secondary};
    padding-top: ${({ theme }) => theme.spacings.smallest};
    margin-top: ${({ theme }) => theme.spacings.smallest};
`;

const PressableContainer = styled.Pressable`
    flex: 1;
    justify-content: space-between;
`;

// eslint-disable-next-line import/prefer-default-export
export {
    Container,
    FooterContainer,
    HeaderContainer,
    LikeContainer,
    PressableContainer,
};

import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

type InnerContainerProps = {
    status: 'error' | 'success';
};

const Button = styled.View`
    align-items: center;
    align-self: stretch;
    border-color: ${({ theme }) => theme.colors['secondary-light']};
    border-radius: 10px;
    border-width: 2px;
    display: flex;
    justify-content: center;
    padding: 0 15px;
`;
const Container = styled(Animated.View)`
    height: 100px;
    position: absolute;
    width: 100%;
    z-index: 1;
`;
const InnerContainer = styled.Pressable<InnerContainerProps>`
    align-items: center;
    background-color: ${({ status, theme }) =>
        status === 'error' ? theme.colors.danger : theme.colors.success};
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    bottom: 0;
    display: flex;
    flex-direction: row;
    height: 100%;
    justify-content: space-between;
    padding: 20px 25px 30px;
    position: absolute;
    width: 100%;
`;
const NotificationContainer = styled.View`
    flex: 1;
`;

export { Button, Container, InnerContainer, NotificationContainer };

import { LinearGradient } from 'expo-linear-gradient';
import * as React from 'react';
import { Dimensions, Keyboard, StatusBar } from 'react-native';
import styled from 'styled-components/native';

import Typography from '../Typography';

type PropsComponent = {
    body: React.ReactNode;
    footer?: React.ReactNode;
    title: string;
};
type PropsContainer = {
    height: number;
};
type PropsHeader = {
    hide: boolean;
};
type PropsReturnButton = {
    currentHeight?: number;
    hide: boolean;
};

const { height } = Dimensions.get('window');

const Body = styled.View`
    background-color: #fffff4;
    border-top-right-radius: 45px;
    padding-top: 30px;
`;
const BodyScrollView = styled.ScrollView`
    padding-left: 45px;
    padding-right: 45px;
`;
const Container = styled(LinearGradient)<PropsContainer>`
    flex: 1;
    height: ${(props) => `${props.height}px`};
    justify-content: space-between;
`;
const Footer = styled.View`
    align-items: center;
    box-shadow: 10px 4px 15px rgba(0, 0, 0, 1);
    height: 90px;
    justify-content: center;
`;
const Form = styled.Pressable`
    bottom: 0;
    justify-content: flex-end;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
`;
const Header = styled.View<PropsHeader>`
    margin: 142px 60px 0 60px;
    opacity: ${(props) => (props.hide ? 0 : 1)};
`;
const ReturnButton = styled.View<PropsReturnButton>`
    left: 0;
    opacity: ${(props) => (props.hide ? 0 : 1)};
    padding: 30px;
    padding-top: ${(props) => `${10 + (props.currentHeight || 0)}px`};
    position: absolute;
    top: 0;
`;
const TitleContainer = styled.View`
    align-items: flex-end;
`;
const Separator = styled.View`
    background-color: #fffff4;
    height: 2px;
    margin-top: 10px;
    width: 45px;
`;

const FormScreen = ({ body, footer, title }: PropsComponent) => {
    const [keyboardIsVisible, setKeyboardIsVisible] =
        React.useState<boolean>(false);
    React.useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => setKeyboardIsVisible(true)
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => setKeyboardIsVisible(false)
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    return (
        <Container colors={['#78fff7', '#7483ff']} height={height}>
            <Header hide={keyboardIsVisible}>
                <TitleContainer>
                    <Typography
                        color="secondary-light"
                        fontFamily="light"
                        fontSize={36}
                        textAlign="right"
                    >
                        {title.toUpperCase()}
                    </Typography>
                    <Separator />
                </TitleContainer>
            </Header>
            <Form onPress={Keyboard.dismiss}>
                <ReturnButton
                    currentHeight={StatusBar.currentHeight}
                    hide={keyboardIsVisible}
                >
                    <Typography color="secondary-light">RETURN</Typography>
                </ReturnButton>
                <Body>
                    <BodyScrollView>
                        {body}
                        <Footer>{footer}</Footer>
                    </BodyScrollView>
                </Body>
            </Form>
        </Container>
    );
};

export default FormScreen;

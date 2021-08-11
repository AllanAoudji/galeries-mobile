import * as React from 'react';
import { Dimensions, Keyboard, StatusBar } from 'react-native';

import {
    Body,
    BodyScrollView,
    Container,
    Footer,
    Form,
    Header,
    ReturnButton,
    Separator,
} from './styles';
import Typography from '../Typography';

type Props = {
    body: React.ReactNode;
    footer?: React.ReactNode;
    title: string;
};

const { height } = Dimensions.get('window');

const FormScreen = ({ body, footer, title }: Props) => {
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
                <Typography
                    color="secondary-light"
                    fontFamily="light"
                    fontSize={36}
                    textAlign="right"
                >
                    {title.toUpperCase()}
                </Typography>
                <Separator />
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

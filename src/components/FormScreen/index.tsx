import * as React from 'react';
import { Dimensions, Keyboard, StatusBar } from 'react-native';
import { useTheme } from 'styled-components/native';

import Typography from '#components/Typography';
import Pictogram from '#components/Pictogram';

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

type Props = {
    body: React.ReactNode;
    footer?: React.ReactNode;
    handleOnPressReturn?: () => void;
    title: string;
};

const { height } = Dimensions.get('window');

const FormScreen = ({ body, footer, handleOnPressReturn, title }: Props) => {
    const [keyboardIsVisible, setKeyboardIsVisible] =
        React.useState<boolean>(false);

    const theme = useTheme();

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
        <Container
            colors={[theme.colors.tertiary, theme.colors.primary]}
            height={height}
        >
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
                {handleOnPressReturn && (
                    <ReturnButton
                        currentHeight={StatusBar.currentHeight}
                        hide={keyboardIsVisible}
                        onPress={handleOnPressReturn}
                    >
                        <Pictogram
                            color="secondary-light"
                            variant="arrow-left"
                        />
                    </ReturnButton>
                )}
                <Body>
                    <BodyScrollView keyboardShouldPersistTaps="always">
                        {body}
                        <Footer>{footer}</Footer>
                    </BodyScrollView>
                </Body>
            </Form>
        </Container>
    );
};

export default FormScreen;

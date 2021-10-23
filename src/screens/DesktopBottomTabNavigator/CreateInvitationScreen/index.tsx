import { useFormik } from 'formik';
import * as React from 'react';
import { Pressable, View } from 'react-native';

import {
    CheckBox,
    CustomButton,
    FormContainer,
    NumberTextInput,
    Typography,
} from '#components';
import { createInvitationSchema } from '#helpers/schemas';

import { Container } from './styles';

type Props = {
    navigation: Screen.DesktopBottomTab.CreateInvitationProp;
};

const initialValues = {
    numOfInvits: '',
    time: '',
};

const CreateInvitationScreen = ({ navigation }: Props) => {
    const [checked, setChecked] = React.useState<boolean>(false);

    const formik = useFormik({
        onSubmit: () => {},
        initialValues,
        validateOnBlur: true,
        validateOnChange: false,
        validationSchema: createInvitationSchema,
    });

    const handlePress = React.useCallback(() => {
        setChecked((prevState) => !prevState);
    }, []);

    const handlePressCreate = React.useCallback(() => {}, []);
    const handlePressCancel = React.useCallback(() => {
        if (navigation.canGoBack()) navigation.goBack();
        else navigation.navigate('Home');
    }, []);

    const handleChangeNumOfInvits = React.useCallback((e: string) => {
        const num = +e;
        if (Number.isNaN(num)) return;
        if (num < 1) formik.setFieldValue('numOfInvits', '1');
        else if (num > 200) formik.setFieldValue('numOfInvits', '200');
        else formik.setFieldValue('numOfInvits', e);
    }, []);
    const handleChangeTime = React.useCallback((e: string) => {
        const num = +e;
        if (Number.isNaN(num)) return;
        if (num < 1) formik.setFieldValue('time', '1');
        else if (num > 99) formik.setFieldValue('time', '99');
        else formik.setFieldValue('time', e);
    }, []);

    return (
        <FormContainer>
            <Container>
                <View>
                    <View style={{ marginLeft: 45 }}>
                        <Typography fontSize={18}>
                            How maby users can subscribe with this invitation
                        </Typography>
                        <Typography color="primary">
                            minimum of 1 user, maximum of 200 users
                        </Typography>
                        <NumberTextInput
                            label="user(s)"
                            onChangeText={handleChangeNumOfInvits}
                            value={formik.values.numOfInvits}
                            maxLength={4}
                            ml="normal"
                            mt="small"
                            placeholder="1"
                            selectTextOnFocus
                        />
                    </View>
                    <View
                        style={{
                            alignItems: 'center',
                            marginTop: 30,
                            marginBottom: 30,
                        }}
                    >
                        <View
                            style={{
                                height: 2,
                                width: 200,
                                backgroundColor: '#7483FF',
                                borderRadius: 1,
                            }}
                        />
                    </View>
                    <Pressable
                        onPress={handlePress}
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                        <View style={{ width: 45 }}>
                            <CheckBox checked={checked} />
                        </View>
                        <View>
                            <Typography fontSize={18}>
                                Set a time life for this invitation{' '}
                                <Typography fontFamily="oblique" fontSize={18}>
                                    (optional)
                                </Typography>
                            </Typography>
                            <Typography color="primary">
                                minimum of 1 day, maximum of 99 days
                            </Typography>
                        </View>
                    </Pressable>
                    <NumberTextInput
                        label="day(s)"
                        onChangeText={handleChangeTime}
                        value={formik.values.time}
                        disable={!checked}
                        maxLength={3}
                        mb="small"
                        mt="small"
                        ml="huge"
                        placeholder="1"
                        selectTextOnFocus
                    />
                </View>
                <View>
                    <CustomButton
                        onPress={handlePressCreate}
                        title="create"
                        mb="smallest"
                    />
                    <CustomButton
                        onPress={handlePressCancel}
                        title="cancel"
                        variant="stroke"
                    />
                </View>
            </Container>
        </FormContainer>
    );
};

export default CreateInvitationScreen;

import { useFormik } from 'formik';
import * as React from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import {
    CheckBox,
    CustomButton,
    FormContainer,
    NumberTextInput,
} from '#components';
import { createInvitationSchema } from '#helpers/schemas';

import Label from './Label';
import Separator from './Separator';

import {
    CheckBoxContainer,
    Container,
    NumOfInvitsContainer,
    TimeLabelContainer,
} from './styles';
import { postInvitations } from '#store/invitations';
import { selectCurrentGalerie } from '#store/galeries';

type Props = {
    navigation: Screen.DesktopBottomTab.CreateInvitationProp;
};

const initialValues = {
    numOfInvits: '',
    time: '',
    checked: false,
};

const CreateInvitationScreen = ({ navigation }: Props) => {
    const dispatch = useDispatch();
    const galerie = useSelector(selectCurrentGalerie);

    const formik = useFormik({
        onSubmit: ({ checked, numOfInvits, time }) => {
            if (!galerie) return;
            if (Number.isNaN(numOfInvits) || numOfInvits === '') return;
            if (checked && (Number.isNaN(time) || time === '')) return;
            dispatch(
                postInvitations(galerie.id, {
                    numOfInvits: +numOfInvits,
                    time: checked ? +time * 1000 * 60 * 60 * 24 : undefined,
                })
            );
        },
        initialValues,
        validateOnBlur: true,
        validateOnChange: false,
        validationSchema: createInvitationSchema,
    });

    const handleChangeNumOfInvits = React.useCallback((e: string) => {
        if (e.length === 0) formik.setFieldValue('numOfInvits', '1');
        const num = e[e.length - 1];
        if (Number.isNaN(+num) || num === ' ') return;
        if (+e < 1) formik.setFieldValue('numOfInvits', '1');
        else if (+e > 200) formik.setFieldValue('numOfInvits', '200');
        else formik.setFieldValue('numOfInvits', e);
    }, []);
    const handleChangeTime = React.useCallback((e: string) => {
        if (e.length === 0) formik.setFieldValue('time', '1');
        const num = e[e.length - 1];
        if (Number.isNaN(+num) || num === ' ') return;
        if (+e < 1) formik.setFieldValue('time', '1');
        else if (+e > 99) formik.setFieldValue('time', '99');
        else formik.setFieldValue('time', e);
    }, []);
    const handlePressCancel = React.useCallback(() => {
        if (navigation.canGoBack()) navigation.goBack();
        else navigation.navigate('Home');
    }, []);
    const handlePressCheckBox = React.useCallback(() => {
        formik.setFieldValue('checked', !formik.values.checked);
    }, [formik.values.checked]);

    React.useEffect(() => {
        if (!galerie) {
            if (navigation.canGoBack()) navigation.goBack();
            else navigation.navigate('Home');
        }
    }, [galerie]);

    const disableButton = React.useMemo(() => {
        const clientHasError =
            formik.submitCount > 0 &&
            (!!formik.errors.numOfInvits || !!formik.errors.time);

        return clientHasError || formik.values.numOfInvits === '';
    }, [formik.submitCount, formik.errors, formik.values]);

    return (
        <FormContainer>
            <Container>
                <View>
                    <NumOfInvitsContainer>
                        <Label
                            subText="minimum of 1 user, maximum of 200 users"
                            text="How maby users can subscribe with this invitation"
                        />
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
                    </NumOfInvitsContainer>
                    <Separator />
                    <TimeLabelContainer onPress={handlePressCheckBox}>
                        <CheckBoxContainer>
                            <CheckBox checked={formik.values.checked} />
                        </CheckBoxContainer>
                        <Label
                            optional
                            subText="minimum of 1 day, maximum of 99 days"
                            text="Set a time life for this invitation"
                        />
                    </TimeLabelContainer>
                    <NumberTextInput
                        label="day(s)"
                        onChangeText={handleChangeTime}
                        value={formik.values.time}
                        disable={!formik.values.checked}
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
                        disable={disableButton}
                        onPress={formik.handleSubmit}
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

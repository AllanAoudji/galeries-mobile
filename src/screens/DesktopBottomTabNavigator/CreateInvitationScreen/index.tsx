import { useFocusEffect } from '@react-navigation/native';
import { useFormik } from 'formik';
import * as React from 'react';
import {
    BackHandler,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { CheckBox, CustomButton, NumberTextInput } from '#components';
import { createInvitationSchema } from '#helpers/schemas';
import { selectCurrentGalerie } from '#store/galeries';
import {
    postInvitations,
    resetInvitationsLoadingPost,
    selectInvitationsLoadingPost,
} from '#store/invitations';

import Label from './Label';
import Separator from './Separator';

import {
    ButtonContainer,
    CheckBoxContainer,
    Container,
    FieldsContainer,
    NumOfInvitsContainer,
    ScrollViewStyle,
    TimeLabelContainer,
} from './styles';
import { GLOBAL_STYLE } from '#helpers/constants';

type Props = {
    navigation: Screen.DesktopBottomTab.CreateInvitationProp;
};

const initialValues = {
    checked: false,
    numOfInvits: '',
    time: '',
};

const CreateInvitationScreen = ({ navigation }: Props) => {
    const dispatch = useDispatch();

    const galerie = useSelector(selectCurrentGalerie);
    const loading = useSelector(selectInvitationsLoadingPost);

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

    const disableButton = React.useMemo(() => {
        const clientHasError =
            formik.submitCount > 0 &&
            (!!formik.errors.numOfInvits || !!formik.errors.time);

        return clientHasError || formik.values.numOfInvits === '';
    }, [formik.submitCount, formik.errors, formik.values]);

    const handleChangeNumOfInvits = React.useCallback((e: string) => {
        const num = e.replace(/\D/g, '');
        if (e.length === 0 || num.length === 0)
            formik.setFieldValue('numOfInvits', '1');
        if (+num < 1) formik.setFieldValue('numOfInvits', '1');
        else if (+num > 200) formik.setFieldValue('numOfInvits', '200');
        else formik.setFieldValue('numOfInvits', num);
    }, []);
    const handleChangeTime = React.useCallback((e: string) => {
        const num = e.replace(/\D/g, '');
        if (e.length === 0 || num.length === 0)
            formik.setFieldValue('time', '1');
        if (+num < 1) formik.setFieldValue('time', '1');
        else if (+num > 99) formik.setFieldValue('time', '99');
        else formik.setFieldValue('time', num);
    }, []);
    const handlePressBack = React.useCallback(() => {
        if (loading.includes('LOADING')) return;
        if (navigation.canGoBack()) navigation.goBack();
        else navigation.navigate('Home');
    }, [loading, navigation]);
    const handlePressCheckBox = React.useCallback(() => {
        formik.setFieldValue('checked', !formik.values.checked);
    }, [formik.values.checked]);

    useFocusEffect(
        React.useCallback(() => {
            if (!galerie) {
                if (navigation.canGoBack()) navigation.goBack();
                else navigation.navigate('Home');
            }
        }, [galerie])
    );
    useFocusEffect(
        React.useCallback(() => {
            if (loading === 'SUCCESS') {
                dispatch(resetInvitationsLoadingPost());
                navigation.navigate('Galerie');
            }
        }, [loading, navigation])
    );
    useFocusEffect(
        React.useCallback(
            () => () => {
                dispatch(resetInvitationsLoadingPost());
                formik.resetForm();
            },
            []
        )
    );
    useFocusEffect(
        React.useCallback(() => {
            let BackHandlerListerner: any;
            if (loading.includes('LOADING'))
                BackHandlerListerner = BackHandler.addEventListener(
                    'hardwareBackPress',
                    () => true
                );
            else if (BackHandlerListerner) BackHandlerListerner.remove();
            return () => {
                if (BackHandlerListerner) BackHandlerListerner.remove();
            };
        }, [loading])
    );

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={GLOBAL_STYLE.HEADER_TAB_HEIGHT}
            style={styles.keyboardAvoidingViewStyle}
        >
            <Container>
                <ScrollViewStyle
                    keyboardShouldPersistTaps="handled"
                    overScrollMode="never"
                    showsVerticalScrollIndicator={false}
                >
                    <FieldsContainer>
                        <NumOfInvitsContainer>
                            <Label
                                subText="minimum of 1 user, maximum of 200 users"
                                text="How many users can subscribe with this invitation"
                            />
                            <NumberTextInput
                                label="user(s)"
                                maxLength={4}
                                ml="normal"
                                mt="small"
                                onChangeText={handleChangeNumOfInvits}
                                placeholder="1"
                                selectTextOnFocus
                                value={formik.values.numOfInvits}
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
                            disable={!formik.values.checked}
                            label="day(s)"
                            maxLength={3}
                            mb="small"
                            ml="huge"
                            mt="small"
                            onChangeText={handleChangeTime}
                            placeholder="1"
                            selectTextOnFocus
                            value={formik.values.time}
                        />
                    </FieldsContainer>
                    <ButtonContainer>
                        <CustomButton
                            disable={disableButton}
                            loading={loading.includes('LOADING')}
                            mb="smallest"
                            mt="normal"
                            onPress={formik.handleSubmit}
                            title="create"
                        />
                        <CustomButton
                            onPress={handlePressBack}
                            title="cancel"
                            variant="stroke"
                        />
                    </ButtonContainer>
                </ScrollViewStyle>
            </Container>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    keyboardAvoidingViewStyle: {
        flex: 1,
    },
});

export default CreateInvitationScreen;

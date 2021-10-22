import * as React from 'react';

import { Pressable, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { CheckBox, CustomButton, FormContainer, Typography } from '#components';

import { Container } from './styles';

const CreateInvitationScreen = () => {
    const [checked, setChecked] = React.useState<boolean>(false);

    const handlePress = React.useCallback(
        () => setChecked((prevState) => !prevState),
        []
    );

    const handlePressCreate = React.useCallback(() => {}, []);
    const handlePressCancel = React.useCallback(() => {}, []);

    return (
        <FormContainer>
            <Container style={{ marginVertical: 45 }}>
                <View>
                    <View style={{ marginLeft: 45 }}>
                        <Typography fontSize={18}>
                            How maby users can subscribe with this invitation
                        </Typography>
                        <Typography color="primary">
                            minimum of 1 user, maximum of 200 users
                        </Typography>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'flex-end',
                                marginTop: 30,
                                marginLeft: 60,
                            }}
                        >
                            <TextInput
                                keyboardType="numeric"
                                placeholder="1"
                                style={{
                                    backgroundColor: '#F2F2E6',
                                    borderBottomWidth: 3,
                                    borderBottomColor: '#7483FF',
                                    height: 45,
                                    width: 50,
                                    paddingHorizontal: 5,
                                    textAlign: 'right',
                                    fontSize: 24,
                                    fontFamily: 'HelveticaLtStRoman',
                                    borderTopLeftRadius: 5,
                                    borderTopRightRadius: 5,
                                    marginRight: 15,
                                }}
                            />
                            <Typography fontFamily="light" fontSize={18}>
                                user(s)
                            </Typography>
                        </View>
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
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'flex-end',
                            marginTop: 30,
                            marginLeft: 105,
                            opacity: checked ? 1 : 0.3,
                            marginBottom: 30,
                        }}
                    >
                        <TextInput
                            keyboardType="numeric"
                            placeholder="1"
                            editable={checked}
                            style={{
                                backgroundColor: '#F2F2E6',
                                borderBottomWidth: 3,
                                borderBottomColor: '#7483FF',
                                height: 45,
                                width: 50,
                                paddingHorizontal: 5,
                                textAlign: 'right',
                                fontSize: 24,
                                fontFamily: 'HelveticaLtStRoman',
                                borderTopLeftRadius: 5,
                                borderTopRightRadius: 5,
                                marginRight: 15,
                            }}
                        />
                        <Typography fontFamily="light" fontSize={18}>
                            day(s)
                        </Typography>
                    </View>
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

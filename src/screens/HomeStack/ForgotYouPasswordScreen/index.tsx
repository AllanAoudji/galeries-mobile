import * as React from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

const ForgotYourPasswordScreen = () => (
    <View>
        <Text>FORGOT YOUR PASSWORD?</Text>
        <View>
            <Text>Register your email to reset your password</Text>
            <View>
                <Text>email or user name</Text>
                <TextInput />
            </View>
            <Pressable>
                <Text>reset your password</Text>
            </Pressable>
        </View>
    </View>
);

export default ForgotYourPasswordScreen;

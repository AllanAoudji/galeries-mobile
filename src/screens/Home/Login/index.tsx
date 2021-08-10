import { Link } from '@react-navigation/native';
import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

const Login = () => {
    return (
        <View>
            <Text>LOGIN</Text>
            <View>
                <View>
                    <Text>email or user name</Text>
                    <TextInput />
                </View>
                <View>
                    <Text>password</Text>
                    <TextInput />
                </View>
                <Link to={{ screen: 'ForgotYourPassword' }}>
                    <Text>Forgot your password?</Text>
                </Link>
                <Pressable>
                    <Text>login</Text>
                </Pressable>
                <View>
                    <Link to={{ screen: 'Signin' }}>
                        <Text>You don't have an account yet?</Text>
                        <Text>Click here.</Text>
                    </Link>
                </View>
            </View>
        </View>
    );
};

export default Login;

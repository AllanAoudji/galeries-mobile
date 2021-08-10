import { Link } from '@react-navigation/native';
import * as React from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

const Signin = () => (
    <View>
        <Text>SIGNIN</Text>
        <View>
            <View>
                <Text>user name</Text>
                <TextInput />
            </View>
            <View>
                <Text>email</Text>
                <TextInput />
            </View>
            <View>
                <Text>password</Text>
                <TextInput />
            </View>
            <View>
                <Text>confirm password</Text>
                <TextInput />
            </View>
            <View>
                <Text>beta key</Text>
                <TextInput />
            </View>
            <Pressable>
                <Text>signin</Text>
            </Pressable>
            <View>
                <Link to={{ screen: 'Login' }}>
                    <Text>You already have an account?</Text>
                    <Text>Click here.</Text>
                </Link>
            </View>
        </View>
    </View>
);

export default Signin;

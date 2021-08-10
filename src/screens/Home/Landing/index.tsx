import { Link } from '@react-navigation/native';
import * as React from 'react';
import { Pressable, Text, View } from 'react-native';

const Landing = () => (
    <View>
        <Text>Welcome to</Text>
        <Text>GALERIES</Text>
        <Text>An app to share pictures with</Text>
        <Text>your friends and famiy</Text>
        <Link to={{ screen: 'Login' }}>
            <View>
                <Text>login</Text>
            </View>
        </Link>
        <Pressable>
            <View>
                <Text>signin</Text>
            </View>
        </Pressable>
    </View>
);

export default Landing;

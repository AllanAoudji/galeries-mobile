import { Link } from '@react-navigation/native';
import * as React from 'react';
import { Pressable, View } from 'react-native';

import Typography from '../../../components/typography';

const LandingScreen = () => (
    <View>
        <Typography fontFamily="light" fontSize={36}>
            Welcome to
        </Typography>
        <Typography fontFamily="bold" fontSize={36}>
            GALERIES
        </Typography>
        <Typography fontFamily="light" fontSize={18}>
            An app to share pictures with
        </Typography>
        <Typography fontFamily="light" fontSize={18}>
            your friends and famiy
        </Typography>
        <Link to={{ screen: 'Login' }}>
            <View>
                <Typography
                    color="primary-dark"
                    fontFamily="bold"
                    fontSize={24}
                >
                    login
                </Typography>
            </View>
        </Link>
        <Pressable>
            <View>
                <Typography
                    color="primary-dark"
                    fontFamily="bold"
                    fontSize={24}
                >
                    signin
                </Typography>
            </View>
        </Pressable>
    </View>
);

export default LandingScreen;

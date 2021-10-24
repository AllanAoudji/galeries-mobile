import * as React from 'react';
import { View } from 'react-native';

import { Typography } from '#components';

type Props = {
    optional?: boolean;
    subText: string;
    text: string;
};

const Label = ({ optional = false, subText, text }: Props) => {
    return (
        <View>
            <Typography fontSize={18}>
                {text}
                {optional && (
                    <Typography fontFamily="oblique" fontSize={18}>
                        {' '}
                        (optional)
                    </Typography>
                )}
            </Typography>
            <Typography color="primary">{subText}</Typography>
        </View>
    );
};

export default Label;

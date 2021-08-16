import * as React from 'react';
import { Svg, Path } from 'react-native-svg';
import { useTheme } from 'styled-components/native';

type Props = {
    color?: keyof Style.Colors;
    customSize?: {
        height: number;
        width: number;
    };
    size?: Style.Variant.Pictogram;
};

const defaultHeight = {
    large: 44,
    normal: 22,
    small: 15,
};
const defaultWidth = {
    large: 44,
    normal: 22,
    small: 15,
};

const ProfileFill = ({
    color = 'black',
    customSize,
    size = 'normal',
}: Props) => {
    const theme = useTheme();
    const height = React.useMemo(() => {
        if (customSize) return customSize.height;
        return defaultHeight[size];
    }, [customSize, size]);
    const width = React.useMemo(() => {
        if (customSize) return customSize.width;
        return defaultWidth[size];
    }, [customSize, size]);

    return (
        <Svg fill="none" height={height} viewBox="0 0 22 22" width={width}>
            <Path
                d="M10.9952 11.5773C12.601 11.5773 13.9027 10.2753 13.9027 8.6692C13.9027 7.0631 12.601 5.76111 10.9952 5.76111C9.3894 5.76111 8.08765 7.0631 8.08765 8.6692C8.08765 10.2753 9.3894 11.5773 10.9952 11.5773Z"
                fill={theme.colors[color]}
            />
            <Path
                d="M10.9951 0C6.76598 0 2.82318 2.50602 1.02249 6.33391C-0.96543 10.5694 0.00925627 15.7522 3.39037 18.9797C7.09639 22.5157 12.939 23.0114 17.1792 20.1253C21.1275 17.443 22.9227 12.3704 21.535 7.79897C20.1418 3.22204 15.786 0 10.9951 0ZM10.7528 19.7177C9.4092 19.6792 8.04905 19.3322 6.87061 18.6823C7.87834 17.421 9.33211 16.4186 10.9951 16.4186C12.6582 16.4186 14.1174 17.421 15.1197 18.6823C13.7925 19.4038 12.2617 19.7563 10.7528 19.7177ZM16.9919 17.3219C15.5382 15.4657 13.4071 14.1053 10.9951 14.1053C8.5832 14.1053 6.4521 15.4713 4.99833 17.3219C0.818742 13.3343 1.71633 6.24028 6.74946 3.42032C11.5678 0.716012 17.873 3.32668 19.3708 8.64716C20.2409 11.7315 19.3103 15.1133 16.9919 17.3219Z"
                fill={theme.colors[color]}
            />
        </Svg>
    );
};

export default ProfileFill;

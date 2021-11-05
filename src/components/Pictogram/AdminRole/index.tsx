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

const AdminRole = ({ color = 'black', customSize, size = 'normal' }: Props) => {
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
                d="M15.4 15.7795L11.2365 16.0105C11.077 16.0215 10.9175 16.0215 10.7635 16.0105L6.59997 15.7795C5.99497 15.7465 5.52197 15.246 5.52197 14.641V8.69001C5.52197 8.43701 5.81897 8.30501 6.00597 8.47001L8.06297 10.241L10.5875 6.21501C10.78 5.90701 11.2255 5.90701 11.418 6.21501L13.9425 10.241L15.9995 8.47001C16.192 8.30501 16.4835 8.44251 16.4835 8.69001V14.641C16.478 15.246 16.005 15.7465 15.4 15.7795Z"
                fill={theme.colors[color]}
            />
            <Path
                d="M11 2.31C13.321 2.31 15.5045 3.212 17.1435 4.8565C18.7825 6.4955 19.69 8.679 19.69 11C19.69 13.321 18.788 15.5045 17.1435 17.1435C15.5045 18.7825 13.321 19.69 11 19.69C8.679 19.69 6.4955 18.788 4.8565 17.1435C3.212 15.5045 2.31 13.321 2.31 11C2.31 8.679 3.212 6.4955 4.8565 4.8565C6.4955 3.212 8.679 2.31 11 2.31ZM11 0C4.9225 0 0 4.9225 0 11C0 17.0775 4.9225 22 11 22C17.0775 22 22 17.0775 22 11C22 4.9225 17.0775 0 11 0Z"
                fill={theme.colors[color]}
            />
        </Svg>
    );
};

export default AdminRole;

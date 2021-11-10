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

const ModeratorRole = ({
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
                d="M11.3136 5.98401L12.4576 9.50951H16.1646C16.4891 9.50951 16.6211 9.92201 16.3626 10.109L13.3651 12.287L14.5091 15.8125C14.6081 16.1205 14.2561 16.3735 13.9976 16.1865L11.0001 14.003L8.00259 16.181C7.74409 16.368 7.39209 16.115 7.49109 15.807L8.63509 12.2815L5.63759 10.1035C5.37909 9.91651 5.51109 9.50401 5.83559 9.50401H9.54259L10.6866 5.97851C10.7856 5.67601 11.2146 5.67601 11.3136 5.98401Z"
                fill={theme.colors[color]}
            />
            <Path
                d="M11 2.31C13.321 2.31 15.5045 3.212 17.1435 4.8565C18.788 6.4955 19.69 8.679 19.69 11C19.69 13.321 18.788 15.5045 17.1435 17.1435C15.5045 18.788 13.321 19.69 11 19.69C8.679 19.69 6.4955 18.788 4.8565 17.1435C3.212 15.5045 2.31 13.321 2.31 11C2.31 8.679 3.212 6.4955 4.8565 4.8565C6.4955 3.212 8.679 2.31 11 2.31ZM11 0C4.9225 0 0 4.9225 0 11C0 17.0775 4.9225 22 11 22C17.0775 22 22 17.0775 22 11C22 4.9225 17.0775 0 11 0Z"
                fill={theme.colors[color]}
            />
        </Svg>
    );
};

export default React.memo(ModeratorRole);

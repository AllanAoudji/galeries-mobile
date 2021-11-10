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

const CommentsStroke = ({
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
                d="M19.69 2.31231V15.7678L18.6835 14.5951L17.9905 13.7913H16.929H2.31V2.31231H19.69ZM20.35 0H1.65C0.737 0 0 0.737738 0 1.65165V14.452C0 15.3659 0.737 16.1036 1.65 16.1036H16.929L22 22V1.65165C22 0.737738 21.263 0 20.35 0Z"
                fill={theme.colors[color]}
            />
            <Path
                d="M11.6654 11.0991H5.47238C4.83438 11.0991 4.31738 10.5816 4.31738 9.94296C4.31738 9.30432 4.83438 8.7868 5.47238 8.7868H11.6654C12.3034 8.7868 12.8204 9.30432 12.8204 9.94296C12.8204 10.5816 12.3034 11.0991 11.6654 11.0991Z"
                fill={theme.colors[color]}
            />
            <Path
                d="M16.3076 11.2918C17.067 11.2918 17.6826 10.6756 17.6826 9.91544C17.6826 9.15529 17.067 8.53906 16.3076 8.53906C15.5482 8.53906 14.9326 9.15529 14.9326 9.91544C14.9326 10.6756 15.5482 11.2918 16.3076 11.2918Z"
                fill={theme.colors[color]}
            />
            <Path
                d="M16.5274 6.94247H5.47238C4.83438 6.94247 4.31738 6.42495 4.31738 5.78631C4.31738 5.14767 4.83438 4.63016 5.47238 4.63016H16.5274C17.1654 4.63016 17.6824 5.14767 17.6824 5.78631C17.6824 6.42495 17.1654 6.94247 16.5274 6.94247Z"
                fill={theme.colors[color]}
            />
        </Svg>
    );
};

export default React.memo(CommentsStroke);

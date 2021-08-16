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

const GaleriesStroke = ({
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
                d="M8.36524 2.321V6.941H2.81024V4.147C2.81024 3.1405 3.62424 2.321 4.62524 2.321H8.36524ZM10.6752 0H4.62524C2.34824 0 0.500244 1.859 0.500244 4.147V9.262H10.6752V0Z"
                fill={theme.colors[color]}
            />
            <Path
                d="M8.36524 13.2495V17.8695H4.62524C3.62424 17.8695 2.81024 17.05 2.81024 16.0435V13.2495H8.36524ZM10.6752 10.923H0.500244V16.038C0.500244 18.3315 2.34824 20.185 4.62524 20.185H10.6752V10.923Z"
                fill={theme.colors[color]}
            />
            <Path
                d="M18.3752 2.321C19.3762 2.321 20.1902 3.1405 20.1902 4.147V6.941H14.6352V2.321H18.3752ZM18.3752 0H12.3252V9.262H22.5002V4.147C22.5002 1.859 20.6522 0 18.3752 0Z"
                fill={theme.colors[color]}
            />
            <Path
                d="M19.6404 13.0405V19.679H14.1404C14.3439 17.919 15.1249 16.2855 16.3899 15.015C17.3139 14.08 18.4249 13.4145 19.6404 13.0405ZM21.9504 10.373C16.3294 10.373 11.7754 14.9545 11.7754 20.603V22H21.9504V10.373Z"
                fill={theme.colors[color]}
            />
        </Svg>
    );
};

export default GaleriesStroke;

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

const EditFill = ({ color = 'black', customSize, size = 'normal' }: Props) => {
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
                d="M21.5943 4.80811L20.5162 5.88604L16.116 1.48632L17.194 0.408391C17.7331 -0.130574 18.5966 -0.136074 19.1246 0.391892L21.6053 2.87223C22.1388 3.4057 22.1278 4.26914 21.5943 4.80811Z"
                fill={theme.colors[color]}
            />
            <Path
                d="M14.8454 2.76257L19.2402 7.15679L5.62684 20.7684L0 22.0003L1.23207 16.3742L14.8454 2.76257Z"
                fill={theme.colors[color]}
            />
        </Svg>
    );
};

export default EditFill;

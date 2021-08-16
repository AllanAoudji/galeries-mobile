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

const AddSubscribeStroke = ({
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
                d="M17.875 0H4.125C1.848 0 0 1.848 0 4.125V17.875C0 20.152 1.848 22 4.125 22H17.875C20.152 22 22 20.152 22 17.875V4.125C22 1.848 20.152 0 17.875 0ZM19.69 17.875C19.69 18.876 18.876 19.69 17.875 19.69H4.125C3.124 19.69 2.31 18.876 2.31 17.875V4.125C2.31 3.124 3.124 2.31 4.125 2.31H17.875C18.876 2.31 19.69 3.124 19.69 4.125V17.875Z"
                fill={theme.colors[color]}
            />
            <Path
                d="M17.875 11C17.875 11.2035 17.7925 11.385 17.6605 11.517C17.5285 11.649 17.347 11.7315 17.1435 11.7315H11.737V17.138C11.737 17.545 11.407 17.8695 11.0055 17.8695C10.5985 17.8695 10.274 17.5395 10.274 17.138V11.7315H4.8565C4.4495 11.7315 4.125 11.4015 4.125 11C4.125 10.7965 4.2075 10.615 4.3395 10.483C4.4715 10.351 4.6585 10.2685 4.8565 10.2685H10.263V4.862C10.263 4.455 10.593 4.13049 10.9945 4.13049C11.4015 4.13049 11.726 4.4605 11.726 4.862V10.2685H17.1325C17.545 10.2685 17.875 10.593 17.875 11Z"
                fill={theme.colors[color]}
            />
        </Svg>
    );
};

export default AddSubscribeStroke;

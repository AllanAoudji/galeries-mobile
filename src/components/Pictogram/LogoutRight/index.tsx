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
    large: 36,
    normal: 18,
    small: 12,
};

const LogoutRight = ({
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
        <Svg fill="none" height={height} width={width} viewBox="0 0 22 22">
            <Path
                d="M15.4443 3.2065C15.6063 3.2065 15.7683 3.2175 15.9303 3.2395V1.375C15.9303 0.616 15.3255 0 14.5803 0H1.35002C0.604811 0 0 0.616 0 1.375V20.625C0 21.384 0.604811 22 1.35002 22H14.5803C15.3255 22 15.9303 21.384 15.9303 20.625V18.733C15.7683 18.755 15.6117 18.766 15.4443 18.766C14.8071 18.766 14.1915 18.5845 13.6622 18.249V19.6845H2.26804V2.3045H13.6622V3.7125C14.1915 3.388 14.8125 3.2065 15.4443 3.2065Z"
                fill={theme.colors[color]}
            />
            <Path
                d="M22 10.989L16.1949 16.17C16.1139 16.2415 16.0221 16.302 15.9303 16.346C15.7791 16.4175 15.6117 16.456 15.4443 16.456C15.1311 16.456 14.8125 16.324 14.5911 16.06C14.1807 15.5815 14.2239 14.85 14.6991 14.432L15.9303 13.3375L17.2588 12.155H8.26219C7.63578 12.155 7.12817 11.638 7.12817 11C7.12817 10.681 7.25778 10.3895 7.45758 10.1805C7.66278 9.97151 7.94899 9.84501 8.26219 9.84501H17.2858L15.9303 8.63501L14.6991 7.54051C14.2293 7.12251 14.1807 6.39101 14.5911 5.91251C14.8125 5.64851 15.1311 5.51651 15.4443 5.51651C15.6117 5.51651 15.7737 5.55501 15.9303 5.62651C16.0221 5.67051 16.1139 5.73101 16.1949 5.80251L22 10.989Z"
                fill={theme.colors[color]}
            />
        </Svg>
    );
};

export default LogoutRight;

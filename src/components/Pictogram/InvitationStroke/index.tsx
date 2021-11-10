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

const InvitationStroke = ({
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
        <Svg fill="none" height={height} viewBox="0 0 22 23" width={width}>
            <Path
                d="M3.12949 6.8245V4.68499C3.12949 3.92599 3.74549 3.30999 4.50449 3.30999H7.88149L11 0.999992L14.1185 3.30999H17.4955C18.2545 3.30999 18.8705 3.92599 18.8705 4.68499V6.8245L22 9.14549V20.8C22 21.1575 21.912 21.4985 21.7635 21.7955C21.4005 22.5105 20.658 23 19.8 23H2.19999C1.34199 23 0.599493 22.5105 0.236492 21.7955C0.0824928 21.4985 -7.62939e-06 21.1575 -7.62939e-06 20.8V9.14549L3.12949 6.8245ZM3.12949 8.8815L1.64999 9.97599V10.372L3.12949 11.472V8.8815ZM17.2205 4.95999H4.77949V12.704L10.021 16.609L10.1805 16.7245C10.4225 16.906 10.714 16.9995 11 16.9995C11.286 16.9995 11.5775 16.906 11.8195 16.7245L11.979 16.609L17.2205 12.704V4.95999ZM20.35 9.97599L18.8705 8.8815V11.4775L20.35 10.3775V9.97599ZM20.35 20.7505V12.429L14.7455 16.6035L20.35 20.7505ZM18.3865 21.35L13.365 17.632L12.8095 18.0445C12.2815 18.435 11.66 18.644 11.0055 18.644C10.351 18.644 9.724 18.435 9.196 18.0445L8.6405 17.632L3.61899 21.35H18.3865ZM7.25449 16.6035L1.64999 12.429V20.7505L7.25449 16.6035Z"
                fill={theme.colors[color]}
            />
        </Svg>
    );
};

export default React.memo(InvitationStroke);

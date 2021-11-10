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

const InvitationFill = ({
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
                d="M7.88165 2.31H14.1187L11.0002 0L7.88165 2.31Z"
                fill={theme.colors[color]}
            />
            <Path
                d="M-7.62939e-06 8.14549V19.8C-7.62939e-06 20.1575 0.0879917 20.4985 0.236492 20.7955C0.599493 21.5105 1.34199 22 2.19999 22H19.8C20.658 22 21.395 21.5105 21.7635 20.7955C21.912 20.4985 22 20.1575 22 19.8V8.14549L18.8705 5.82999V10.4775L20.35 9.37749V11.4345L14.7455 15.609L20.35 19.7505V20.35H18.3865L13.365 16.632L12.8095 17.0445C12.2815 17.435 11.66 17.644 11.0055 17.644C10.351 17.644 9.724 17.435 9.196 17.0445L8.6405 16.632L3.61899 20.35H1.64999V19.7505L7.25449 15.6035L1.64999 11.429V9.37199L3.12949 10.472V5.82449L-7.62939e-06 8.14549Z"
                fill={theme.colors[color]}
            />
            <Path
                d="M4.7797 5.38999V11.704L10.0212 15.609L10.1807 15.7245C10.4227 15.906 10.7142 15.9995 11.0002 15.9995C11.2862 15.9995 11.5777 15.906 11.8197 15.7245L11.9792 15.609L17.2207 11.704V5.38999C17.2207 4.59799 16.5827 3.95999 15.7907 3.95999H6.2097C5.4177 3.95999 4.7797 4.59799 4.7797 5.38999Z"
                fill={theme.colors[color]}
            />
        </Svg>
    );
};

export default React.memo(InvitationFill);

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
    large: 24,
    normal: 12,
    small: 8,
};

const KeyStroke = ({ color = 'black', customSize, size = 'normal' }: Props) => {
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
        <Svg fill="none" height={height} viewBox="0 0 12 22" width={width}>
            <Path
                d="M11.9683 4.8125C11.6737 2.046 9.34442 0 6.63328 0C6.4369 0 6.24598 0.011 6.0496 0.033C3.09299 0.352 0.954626 3.014 1.27102 5.973C1.52195 8.327 3.25664 10.164 5.44409 10.6535V13.805H1.87652C0.840071 13.805 0 14.652 0 15.697V19.338C0 20.383 0.840071 21.23 1.87652 21.23H4.67494C5.09497 21.23 5.43864 21.5765 5.43864 22H7.7461V10.659C10.4081 10.0925 12.2683 7.5845 11.9683 4.8125ZM6.69874 4.95C5.79321 4.95 5.06224 4.213 5.06224 3.3C5.06224 2.387 5.79321 1.65 6.69874 1.65C7.60427 1.65 8.33525 2.387 8.33525 3.3C8.33525 4.213 7.59882 4.95 6.69874 4.95Z"
                fill={theme.colors[color]}
            />
        </Svg>
    );
};

export default React.memo(KeyStroke);

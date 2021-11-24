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
                d="M11.9683 4.8125C11.6737 2.0515 9.34442 0 6.63328 0C6.4369 0 6.24598 0.0109987 6.0496 0.0329987C3.09299 0.351999 0.954626 3.014 1.27102 5.973C1.52195 8.327 3.25664 10.164 5.44409 10.6535V13.805H1.87652C0.840071 13.805 0 14.652 0 15.697V19.338C0 20.383 0.840071 21.23 1.87652 21.23H4.67494C5.09497 21.23 5.43864 21.5765 5.43864 22H7.7461V10.659C10.4081 10.0925 12.2683 7.5845 11.9683 4.8125ZM5.455 18.92H2.2911V16.115H5.455V18.92ZM9.02803 7.315C8.5098 7.9585 7.76792 8.3655 6.94422 8.4535C6.82966 8.4645 6.71511 8.47 6.60601 8.47C5.84776 8.47 5.11679 8.1895 4.54947 7.6835C3.98215 7.1775 3.62758 6.479 3.54575 5.7255C3.36574 4.037 4.59857 2.5135 6.29507 2.332C6.40963 2.321 6.52418 2.3155 6.63874 2.3155C7.39698 2.3155 8.12795 2.596 8.69528 3.102C9.2626 3.608 9.61717 4.3065 9.699 5.06C9.78082 5.874 9.5408 6.677 9.02803 7.315Z"
                fill={theme.colors[color]}
            />
        </Svg>
    );
};

export default React.memo(KeyStroke);

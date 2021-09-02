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

const Switch = ({ color = 'black', customSize, size = 'normal' }: Props) => {
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
                d="M20.1515 4.88917C21.8784 7.47431 22.3624 10.5325 21.7409 13.3541L21.6804 13.3596L18.8151 13.7392C19.6455 11.363 19.3926 8.64587 17.8911 6.39625C15.7243 3.15108 11.6545 1.93001 8.1457 3.21708C7.54624 3.43709 6.95777 3.73411 6.4023 4.10263L7.48024 5.71421L0.0556641 6.70427L3.81195 0.230416L4.89539 1.8475C5.44536 1.47898 6.01732 1.17097 6.60579 0.912453C11.3905 -1.17766 17.1487 0.395425 20.1515 4.88917Z"
                fill={theme.colors[color]}
            />
            <Path
                d="M18.1826 21.7641L17.1047 20.1525C16.5547 20.521 15.9828 20.829 15.3943 21.0875C10.6041 23.1777 4.84591 21.6046 1.84308 17.1108C0.121683 14.5202 -0.362289 11.4565 0.259175 8.63487L0.314172 8.62937L3.19051 8.24985C2.35456 10.626 2.60754 13.3541 4.10895 15.6037C6.27583 18.8489 10.3456 20.07 13.8544 18.7829C14.4539 18.5629 15.0423 18.2659 15.5978 17.8974L14.5199 16.2693L21.9334 15.2902L18.1826 21.7641Z"
                fill={theme.colors[color]}
            />
        </Svg>
    );
};

export default Switch;

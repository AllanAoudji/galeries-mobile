import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';

type Props = {
    color?: keyof Style.Colors;
    fontFamily?: keyof Style.FontFamilies;
    fontSize?: keyof Style.FontSizes;
    textAlign?: keyof Style.TextAlign;
};

const Container = styled(Animated.Text)<Props>`
    color: ${({ color, theme }) => theme.colors[color || 'black']};
    font-family: ${({ fontFamily, theme }) =>
        theme.font.families[fontFamily || 'roman']};
    font-size: ${({ fontSize, theme }) => theme.font.sizes[fontSize || 14]};
    text-align: ${(props) => props.textAlign || 'left'};
`;

Container.defaultProps = {
    color: 'black',
    fontFamily: 'roman',
    fontSize: 14,
    textAlign: 'left',
};

export default Container;

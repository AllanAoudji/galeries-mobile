import styled from 'styled-components/native';

type Props = {
    color?: keyof Colors;
    fontFamily?: keyof FontFamilies;
    fontSize?: keyof FontSizes;
    textAlign?: keyof TextAlign;
};

const Container = styled.Text<Props>`
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

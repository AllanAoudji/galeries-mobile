import styled from 'styled-components/native';

type Props = {
    color?:
        | 'black'
        | 'danger'
        | 'primary'
        | 'primary-dark'
        | 'primary-light'
        | 'secondary'
        | 'secondary-dark'
        | 'secondary-light'
        | 'success'
        | 'tertiary'
        | 'tertiary-dark'
        | 'tertiary-light'
        | 'white';
    fontFamily?: 'bold' | 'light' | 'oblique' | 'roman';
    fontSize?: 12 | 14 | 18 | 24 | 36 | 48 | 64;
    textAlign?: 'center' | 'left' | 'right';
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

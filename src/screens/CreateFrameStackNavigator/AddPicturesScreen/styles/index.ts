import { LinearGradient } from 'expo-linear-gradient';
import styled from 'styled-components/native';

type ReturnButtonProps = {
    paddingTop?: number;
};

const Body = styled.View`
    background-color: ${({ theme }) => theme.colors['secondary-light']};
    border-top-left-radius: 50px;
    height: auto;
    padding: ${({ theme }) =>
        `${theme.spacings.normal} ${theme.spacings.normal} ${theme.spacings.largest}`};
    width: 100%;
`;
const Container = styled(LinearGradient)`
    flex: 1;
    justify-content: space-between;
`;
const Header = styled.View`
    align-items: flex-end;
    flex: 1;
    justify-content: center;
    margin: ${({ theme }) => ` 0 ${theme.spacings.large}`};
`;
const ReturnButtonContainer = styled.View<ReturnButtonProps>`
    left: 0;
    padding-top: ${({ paddingTop }) => `${paddingTop || 0}px`};
    position: absolute;
    top: 0;
`;
const Separator = styled.View`
    background-color: ${({ theme }) => theme.colors['primary-light']};
    border-radius: 1px;
    height: 2px;
    margin-top: 10px;
    width: ${({ theme }) => theme.spacings.normal};
`;
const TextContainer = styled.View`
    padding-bottom: ${({ theme }) => theme.spacings.small};
`;

export {
    Body,
    Container,
    Header,
    ReturnButtonContainer,
    Separator,
    TextContainer,
};

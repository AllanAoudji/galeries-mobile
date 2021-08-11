import styled from 'styled-components/native';

type Props = {
    hide: boolean;
};

const Header = styled.View<Props>`
    align-items: flex-end;
    margin: ${({ theme }) =>
        `142px ${theme.spacings.large} 0 ${theme.spacings.large}`};
    opacity: ${(props) => (props.hide ? 0 : 1)};
`;

export default Header;

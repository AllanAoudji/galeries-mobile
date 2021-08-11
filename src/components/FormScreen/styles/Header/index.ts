import styled from 'styled-components/native';

type Props = {
    hide: boolean;
};

const Header = styled.View<Props>`
    align-items: flex-end;
    margin: 142px 60px 0 60px;
    opacity: ${(props) => (props.hide ? 0 : 1)};
`;

export default Header;

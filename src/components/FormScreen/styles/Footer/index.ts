import styled from 'styled-components/native';

const Footer = styled.View`
    align-items: center;
    box-shadow: 10px 4px 15px rgba(0, 0, 0, 1);
    height: ${({ theme }) => theme.spacings.huge};
    justify-content: center;
`;

export default Footer;

import styled from 'styled-components/native';

const BodyScrollView = styled.ScrollView`
    padding-left: ${({ theme }) => theme.spacings.normal};
    padding-right: ${({ theme }) => theme.spacings.normal};
`;

export default BodyScrollView;

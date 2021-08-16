import styled from 'styled-components/native';

type Props = {
    small?: boolean;
};

const PictogramContainer = styled.View<Props>`
    padding-right: ${({ small }) => (small ? '10px' : '20px')};
`;

PictogramContainer.defaultProps = {
    small: false,
};

export default PictogramContainer;

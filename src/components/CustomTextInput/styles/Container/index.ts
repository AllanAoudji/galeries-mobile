import styled from 'styled-components/native';

type Props = {
    hasFocus: boolean;
    editable: boolean;
};

const Container = styled.Pressable<Props>`
    opacity: ${({ editable, hasFocus }) => (hasFocus || !editable ? 1 : 0.5)};
`;

export default Container;

import styled from 'styled-components/native';

type Props = {
    hasFocus: boolean;
    hasValue: boolean;
};

const LabelAnimation = styled.View<Props>`
    opacity: ${(props) => (props.hasFocus ? 1 : 0.5)};
    position: absolute;
    top: ${(props) => (props.hasFocus || props.hasValue ? 0 : '21px')};
`;

export default LabelAnimation;

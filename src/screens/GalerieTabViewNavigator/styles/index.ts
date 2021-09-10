import styled from 'styled-components/native';

type AbsoluteTopContainerProps = {
    height: number;
};

const AbsoluteCoverPicture = styled.View`
    bottom: 0;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
`;
const AbsoluteTopContainer = styled.View<AbsoluteTopContainerProps>`
    align-items: flex-end;
    flex-direction: row;
    height: ${({ height }) => `${height}px`};
    justify-content: flex-start;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 2;
`;
const Container = styled.View`
    flex: 1;
`;
const PictogramContainer = styled.Pressable`
    justify-content: center;
    padding: ${({ theme }) =>
        `${theme.spacings.smallest} ${theme.spacings.small}`};
`;

export {
    AbsoluteCoverPicture,
    AbsoluteTopContainer,
    Container,
    PictogramContainer,
};

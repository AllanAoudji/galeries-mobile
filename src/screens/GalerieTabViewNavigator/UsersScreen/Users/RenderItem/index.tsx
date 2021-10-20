import * as React from 'react';
import styled from 'styled-components/native';

const StyledView = styled.View`
    background-color: red;
    height: 150px;
    margin-bottom: 10px;
    width: 100%;
`;

type Props = {
    item: string;
};

const RenderItem = ({ item }: Props) => {
    return <StyledView />;
};

export default React.memo(RenderItem);

import * as React from 'react';

import { Pictogram } from '#components';
import { DRAG_AND_DROP_UTILS } from '#helpers/constants';

import Item from './Item';

import { AddPicture, Container } from './styles';

type Props = {
    children: React.ReactElement<{ id: string }>[];
    handlePressOpenSheet: () => void;
};

const List = ({ children, handlePressOpenSheet }: Props) => {
    const position = React.useMemo(
        () => DRAG_AND_DROP_UTILS.getPosition(children.length),
        [children]
    );

    // TODO: Need to restyle
    const addPicture = React.useMemo(
        () =>
            children.length < 6 && (
                <AddPicture
                    left={position.x}
                    onPress={handlePressOpenSheet}
                    top={position.y}
                >
                    <Pictogram color="primary" variant="plus" />
                </AddPicture>
            ),
        [children, handlePressOpenSheet, position]
    );
    const items = React.useMemo(
        () =>
            children.map((child) => {
                return (
                    <Item id={child.props.id} key={child.props.id}>
                        {child}
                    </Item>
                );
            }),
        [children]
    );

    return (
        <Container>
            {items}
            {addPicture}
        </Container>
    );
};

export default List;

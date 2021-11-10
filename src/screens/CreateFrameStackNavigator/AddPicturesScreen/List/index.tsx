import * as React from 'react';

import { Pictogram } from '#components';
import { BottomSheetContext } from '#contexts/BottomSheetContext';
import { DRAG_AND_DROP_UTILS } from '#helpers/constants';

import Item from './Item';
import NavigateCameraButton from './NavigateCameraButton';
import NavigateGalleryButton from './NavigateGalleryButton';

import { AddPicture, Container } from './styles';

type Props = {
    children: React.ReactElement<{ id: string }>[];
};

const List = ({ children }: Props) => {
    const { openBottomSheet } = React.useContext(BottomSheetContext);

    const position = React.useMemo(
        () => DRAG_AND_DROP_UTILS.getPosition(children.length),
        [children]
    );

    const bottomSheetContainer = React.useCallback(() => {
        return (
            <>
                <NavigateCameraButton />
                <NavigateGalleryButton />
            </>
        );
    }, []);
    const handleOpenSheet = React.useCallback(() => {
        if (children.length < 6) openBottomSheet(bottomSheetContainer);
    }, [bottomSheetContainer, children, openBottomSheet]);

    return (
        <Container>
            {children.map((child) => {
                return (
                    <Item id={child.props.id} key={child.props.id}>
                        {child}
                    </Item>
                );
            })}
            {children.length < 6 && (
                <AddPicture
                    left={position.x}
                    onPress={handleOpenSheet}
                    top={position.y}
                >
                    <Pictogram color="primary" variant="plus" />
                </AddPicture>
            )}
        </Container>
    );
};

export default List;

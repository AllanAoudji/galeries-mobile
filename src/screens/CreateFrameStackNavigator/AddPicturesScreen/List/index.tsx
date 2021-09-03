import * as React from 'react';
import { View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';

import { Positions } from '../utils';
import Item from './Item';

type Props = {
    children: React.ReactElement<{ id: string }>[];
};

const List = ({ children }: Props) => {
    const positions = useSharedValue<Positions>(
        Object.assign(
            {},
            ...children.map((child, index) => ({ [child.props.id]: index }))
        )
    );
    return (
        <View>
            {children.map((child) => {
                return (
                    <Item
                        id={child.props.id}
                        key={child.props.id}
                        positions={positions}
                    >
                        {child}
                    </Item>
                );
            })}
        </View>
    );
};

export default List;

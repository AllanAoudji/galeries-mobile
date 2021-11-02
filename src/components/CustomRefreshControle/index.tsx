import * as React from 'react';
import { RefreshControl } from 'react-native';
import { useTheme } from 'styled-components/native';

type Props = {
    onRefresh: () => void;
    progressViewOffset?: number;
    refreshing: boolean;
};

const CustomRefreshControle = ({
    onRefresh,
    progressViewOffset,
    refreshing,
}: Props) => {
    const theme = useTheme();

    const colors = React.useMemo(
        () => [
            theme.colors.primary,
            theme.colors.tertiary,
            theme.colors['primary-dark'],
            theme.colors['tertiary-light'],
        ],
        []
    );

    return (
        <RefreshControl
            colors={colors}
            onRefresh={onRefresh}
            progressViewOffset={progressViewOffset}
            progressBackgroundColor={theme.colors['secondary-dark']}
            refreshing={refreshing}
        />
    );
};

export default React.memo(CustomRefreshControle);

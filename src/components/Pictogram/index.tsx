import * as React from 'react';

import ArrowLeft from './ArrowLeft';
import ArrowRight from './ArrowRight';
import LogoutLeft from './LogoutLeft';
import LogoutRight from './LogoutRight';
import ModerationFill from './ModerationFill';
import ModerationStroke from './ModerationStroke';
import SettingsFill from './SettingsFill';
import SettingsStroke from './SettingsStroke';
import TicketFill from './TicketFill';
import TicketStroke from './TicketStroke';

type Props = {
    color?: keyof Style.Colors;
    customSize?: {
        height: number;
        width: number;
    };
    size?: Style.Variant.Pictogram;
    variant: Style.Pictograms;
};

const variants = {
    'arrow-left': ArrowLeft,
    'arrow-right': ArrowRight,
    'logout-left': LogoutLeft,
    'logout-right': LogoutRight,
    'moderation-fill': ModerationFill,
    'moderation-stroke': ModerationStroke,
    'settings-fill': SettingsFill,
    'settings-stroke': SettingsStroke,
    'ticket-fill': TicketFill,
    'ticket-stroke': TicketStroke,
};

const Pictograms = ({
    color = 'black',
    customSize,
    size = 'normal',
    variant,
}: Props) => {
    const PictogramVariant = variants[variant];

    return (
        <PictogramVariant color={color} size={size} customSize={customSize} />
    );
};

export default Pictograms;

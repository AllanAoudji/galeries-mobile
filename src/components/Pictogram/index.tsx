import * as React from 'react';

import AddSubscribeFill from './AddSubscribeFill';
import AddSubscribeStroke from './AddSubscribeStroke';
import ArrowLeft from './ArrowLeft';
import ArrowRight from './ArrowRight';
import GaleriesFill from './GaleriesFill';
import GaleriesStroke from './GaleriesStroke';
import HamburgerMenu from './HamburgerMenu';
import HeartFill from './HeartFill';
import HeartStroke from './HeartStroke';
import HomeFill from './HomeFill';
import HomeStroke from './HomeStroke';
import LogoutLeft from './LogoutLeft';
import LogoutRight from './LogoutRight';
import ModerationFill from './ModerationFill';
import ModerationStroke from './ModerationStroke';
import ProfileFill from './ProfileFill';
import ProfileStroke from './ProfileStroke';
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
    'add/subscribe-fill': AddSubscribeFill,
    'add/subscribe-stroke': AddSubscribeStroke,
    'arrow-left': ArrowLeft,
    'arrow-right': ArrowRight,
    'galeries-fill': GaleriesFill,
    'galeries-stroke': GaleriesStroke,
    'hamburger-menu': HamburgerMenu,
    'heart-fill': HeartFill,
    'heart-stroke': HeartStroke,
    'home-fill': HomeFill,
    'home-stroke': HomeStroke,
    'logout-left': LogoutLeft,
    'logout-right': LogoutRight,
    'moderation-fill': ModerationFill,
    'moderation-stroke': ModerationStroke,
    'profile-fill': ProfileFill,
    'profile-stroke': ProfileStroke,
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
    const PictogramVariant = React.useMemo(() => variants[variant], [variant]);

    return (
        <PictogramVariant color={color} size={size} customSize={customSize} />
    );
};

export default React.memo(Pictograms);

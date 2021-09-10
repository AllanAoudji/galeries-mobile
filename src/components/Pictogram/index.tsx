import * as React from 'react';

import AddSubscribeFill from './AddSubscribeFill';
import AddSubscribeStroke from './AddSubscribeStroke';
import ArrowLeft from './ArrowLeft';
import ArrowRight from './ArrowRight';
import CameraFill from './CameraFill';
import CameraStroke from './CameraStroke';
import CommentFill from './CommentsFill';
import CommentsStroke from './CommentsStroke';
import Download from './Download';
import EditFill from './EditFill';
import EditStroke from './EditStroke';
import FlashOff from './FlashOff';
import FlashOn from './FlashOn';
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
import OptionHorizontal from './OptionHorizontal';
import OptionVertical from './OptionVertical';
import Plus from './Plus';
import ProfileFill from './ProfileFill';
import ProfileStroke from './ProfileStroke';
import Search from './Search';
import SettingsFill from './SettingsFill';
import SettingsStroke from './SettingsStroke';
import Switch from './Switch';
import TicketFill from './TicketFill';
import TicketStroke from './TicketStroke';
import Upload from './Upload';
import Valid from './Valid';

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
    'camera-fill': CameraFill,
    'camera-stroke': CameraStroke,
    'comments-fill': CommentFill,
    'comments-stroke': CommentsStroke,
    download: Download,
    'edit-fill': EditFill,
    'edit-stroke': EditStroke,
    'flash-off': FlashOff,
    'flash-on': FlashOn,
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
    'option-horizontal': OptionHorizontal,
    'option-vertical': OptionVertical,
    plus: Plus,
    'profile-fill': ProfileFill,
    'profile-stroke': ProfileStroke,
    search: Search,
    'settings-fill': SettingsFill,
    'settings-stroke': SettingsStroke,
    switch: Switch,
    'ticket-fill': TicketFill,
    'ticket-stroke': TicketStroke,
    upload: Upload,
    valid: Valid,
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

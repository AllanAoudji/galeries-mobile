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
import Quit from './Quit';
import Search from './Search';
import SettingsFill from './SettingsFill';
import SettingsStroke from './SettingsStroke';
import Switch from './Switch';
import TicketFill from './TicketFill';
import TicketStroke from './TicketStroke';
import Upload from './Upload';
import Valid from './Valid';

import { Container, ContainerPressable } from './styles';

type Props = {
    color?: keyof Style.Colors;
    customSize?: {
        height: number;
        width: number;
    };
    height?: number;
    mb?: keyof Style.Spacings;
    ml?: keyof Style.Spacings;
    mr?: keyof Style.Spacings;
    mt?: keyof Style.Spacings;
    onPress?: () => void;
    pb?: keyof Style.Spacings;
    pl?: keyof Style.Spacings;
    pr?: keyof Style.Spacings;
    pt?: keyof Style.Spacings;
    size?: Style.Variant.Pictogram;
    variant: Style.Pictograms;
    width?: number;
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
    quit: Quit,
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
    height,
    color = 'black',
    customSize,
    mb,
    ml,
    mr,
    mt,
    onPress,
    pb,
    pl,
    pr,
    pt,
    size = 'normal',
    variant,
    width,
}: Props) => {
    const PictogramVariant = React.useMemo(() => variants[variant], [variant]);

    if (onPress)
        return (
            <ContainerPressable
                height={height}
                mb={mb}
                ml={ml}
                mr={mr}
                mt={mt}
                pb={pb}
                pl={pl}
                pr={pr}
                pt={pt}
                onPress={onPress}
                width={width}
            >
                <PictogramVariant
                    color={color}
                    size={size}
                    customSize={customSize}
                />
            </ContainerPressable>
        );

    return (
        <Container
            height={height}
            mb={mb}
            ml={ml}
            mr={mr}
            mt={mt}
            pb={pb}
            pl={pl}
            pr={pr}
            pt={pt}
            width={width}
        >
            <PictogramVariant
                color={color}
                size={size}
                customSize={customSize}
            />
        </Container>
    );
};

export default Pictograms;

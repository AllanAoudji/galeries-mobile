import * as React from 'react';

import DesktopStack from '#screens/DesktopStack';

// TODO:
// Add stack
// UpdateGalerie/FullPageFrame/FullPageProfilePicture/Drawer
// Rename stack

const DesktopScreen = () => <DesktopStack />;

export default DesktopScreen;

// RootDesktopStack UpdateGalerie/FullPageFrame/FullPageProfilePicture
// Toute les page qui sont des "endpoint" (seul moyen de naviger est de cliquer sur retour)
// + Drawer

// DrawerDesktopStack === drawer
// SendTicket/Settings/Moderation

// BottomTabDesktopStack
// Home/Galeries/etc.
// Likes/Comments (ne pas les référencer)

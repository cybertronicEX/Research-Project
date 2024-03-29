import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Profile',
        path: '/profile',
        icon: <FaIcons.FaUserCircle  />,
        cName: 'nav-text'
    },
    {
        title: 'Fashion-Profiler',
        path: '/fashionProfiler',
        icon: <IoIcons.IoIosPaper />,
        cName: 'nav-text'
    },
    //  {
    //     title: 'Data-Extraction',
    //     path: '/dataExtraction',
    //     icon: <FaIcons.FaDatabase />,
    //     cName: 'nav-text'
    // },
    {
        title: 'Recommendation Engine',
        path: '/recommender',
        icon: <FaIcons.FaMicrochip  />,
        cName: 'nav-text'
    },
    {
        title: 'Fashion Vision',
        path: '/fashionVision',
        icon: <FaIcons.FaCameraRetro  />,
        cName: 'nav-text'
    },
    {
        title: 'Item Scan',
        path: '/itemscan',
        icon: <FaIcons.FaCashRegister   />,
        cName: 'nav-text'
    },
// enter ur page routes here with titles and icons for it to display on nav bar
// https://react-icons.github.io/react-icons/icons/fa/ in case need to change icons
    {
        title: 'Mahens',
        path: '/Mahen',
        icon: <FaIcons.FaCube />,
        cName: 'nav-text'
    },
    {
        title: 'Nikils',
        path: '/Nikil',
        icon: <FaIcons.FaRocketchat />,
        cName: 'nav-text'
    },
    {
        title: 'Logout',
        path: '/logout',
        icon: <AiIcons.AiOutlineLogout />,
        cName: 'nav-text'
    }
]
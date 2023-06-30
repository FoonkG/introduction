export enum eNavigation {
    Dashboard = 0,
    Tasks = 1,
    Wallets = 2,
    Proxies = 3,
    Settings = 4,
}

export interface INavigation{
    navigation: eNavigation;
    setNavigation: (navigation: eNavigation) => void;
}
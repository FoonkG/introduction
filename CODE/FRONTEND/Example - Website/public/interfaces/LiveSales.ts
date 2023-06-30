export enum LiveSales{
    Sale = "99, 195, 147",
    List = "99, 172, 195",
}

export interface ILiveSale{
    index: number;
    iconURL: string;
    name: string;
    number: string;
    timing: string;
    price: string;
    sale: LiveSales;
    saleName: string;
    clickEtherScan: (index: number) => void;
    clickOpenSea: (index: number) => void;
    clickLooksRare: (index: number) => void;
}
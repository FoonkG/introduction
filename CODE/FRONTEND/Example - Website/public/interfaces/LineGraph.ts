export interface ILineGraph{
    width: string;
    height: string;
    data: {
        labels: number[],
        data: number[]
    };
    marginTop?: string;
}
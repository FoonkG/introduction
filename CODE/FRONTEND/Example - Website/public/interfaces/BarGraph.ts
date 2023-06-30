export interface IBarGraph{
    width: string;
    height: string;
    data: {
        labels: number[],
        data: number[]
    };
    marginTop?: string;
}
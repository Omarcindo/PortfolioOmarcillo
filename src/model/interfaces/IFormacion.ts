export interface IFormacion {
    id: number;
    title: string;
    href: string;
    date: string;
    datetime: string;
    category: {
        title: string;
        href: string;
    };
    imageUrl: string;
}
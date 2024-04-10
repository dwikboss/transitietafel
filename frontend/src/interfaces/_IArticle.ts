export interface Article {
    title: string;
    paragraph: string;
    url: string;
    media: { type: string; link: string }[];
}
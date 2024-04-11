export interface Article {
    title: string;
    paragraph: string;
    url: string;
    summary: { webpages_summary: string; };
    media: { type: string; link: string }[];
}
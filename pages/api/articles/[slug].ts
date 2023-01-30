import type { NextApiHandler } from "next";
import articles from "@/data/articles";

const handler: NextApiHandler = async (req,res) => {
    if (req.method === 'GET') {
        const articleSlug = req.query.slug as string;
        const article = articles.find(({slug}) => slug === articleSlug);

        if (!article) {
            return res.status(404).json({ error: 'Article not found'})
        }
        return res.status(200).json(article);
    }
    return res.status(405).json({error: 'Method not allowed'})
}

export default handler;
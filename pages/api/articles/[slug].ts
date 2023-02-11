import type { NextApiHandler } from "next";
import articles from "@/data/articles";
import tutorials from "@/data/tutorials";

const handler: NextApiHandler = async (req,res) => {
    if (req.method === 'GET') {
        const requestSlug = req.query.slug as string;
        const article = articles.find(({slug}) => slug === requestSlug);
        const tutorial = tutorials.find(({slug}) => slug === requestSlug)
        const data = {...article, ...tutorial}
        if (!data) {
            return res.status(404).json({ error: 'Page not found'})
        }
        return res.status(200).json(data);
    }
    return res.status(405).json({error: 'Method not allowed'})
}

export default handler;
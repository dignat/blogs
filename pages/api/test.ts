import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
    console.log(req.query, 'request')
    res.status(200).json({ message: 'API test endpoint working' });
}

export default handler;
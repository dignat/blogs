import type { Article } from "@/data/articles";
const Article = (article: Article) => {
    return ( 
        <>
        <h1>{article.title}</h1>
        </>
     );
}
 
export default Article;
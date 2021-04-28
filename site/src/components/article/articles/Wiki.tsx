import { urlFor } from "../../../util/utils";
import { ArticleProps, MarkdownArticle } from "../Article";

const Wiki = (props: ArticleProps) => (
  <MarkdownArticle src={urlFor("/wiki/Home.md")} {...props} />
);

export default Wiki;

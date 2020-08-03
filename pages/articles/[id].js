import Layout from '../../components/layout'
import Head from 'next/head'
import { getAllArticleIds, getArticleData } from '../../lib/articles'
import Date from '../../components/date'
// import utilStyles from '../../styles/utils.module.css'

export default function Article({ article }) {
  return (
    <Layout>
      <Head>
        <title>{article.title}</title>
      </Head>
      <article>
        <h1>{article.title}</h1>
        <div>
          <Date dateString={article.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: article.contentHtml }} />
      </article>
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = getAllArticleIds()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  // Fetch necessary data for the blog post using params.id
  const article = await getArticleData(params.id)
  return {
    props: {
      article
    }
  }
}
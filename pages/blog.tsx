import Layout from "@components/layout/layout"
import { NextPage } from "next"
import TitleWrapper from "@components/common/title"
import { GetStaticProps } from "next"
import styled from "@emotion/styled"
import { css } from "@emotion/css"
import Post from "@components/post/post"
import { POST_PATH } from "@utils/mdx-utils"
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { FrontMatter } from "@utils/types"
import useScroll from "@hooks/scroll"
import { CategoryTable } from "@components/category-table/category-table"

interface BlogPageProps {
  frontMatterList: FrontMatter[]
}

const PostsWrapper = styled.div`
  display: flex;
  max-width: 50rem;
  margin: 0 auto 1rem auto;
  flex-flow: column wrap;
`

const titleStyles = css`
  margin-bottom: 2rem;
`

const BlogPage: NextPage<BlogPageProps> = ({ frontMatterList }) => {
  const { data: posts } = useScroll({ list: frontMatterList })

  const xs = frontMatterList.map((x) => x.category).filter((c, i, arr) => arr.indexOf(c) === i)

  return (
    <Layout>
      <TitleWrapper title="Posts" subTitle="running posts" className={titleStyles} />
      <CategoryTable uniqueList={xs} />
      <PostsWrapper>
        {posts.map((post) => (
          <Post key={post.slug} post={post} />
        ))}
      </PostsWrapper>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = fs.readdirSync("posts")
  const postsToString = posts.map((x) => fs.readFileSync(path.join(POST_PATH, `${x}`), "utf-8"))
  const frontMatterList: FrontMatter[] = []

  postsToString.forEach((p) => {
    const { data: frontMatter } = matter(p)
    frontMatterList.push(frontMatter as FrontMatter)
  })

  return {
    props: { frontMatterList },
  }
}

export default BlogPage

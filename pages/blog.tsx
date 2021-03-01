import Layout from "@components/layout/layout"
import { NextPage } from "next"
import TitleWrapper from "@components/common/title"
import fs from "fs"
import { GetStaticProps } from "next"
import styled from "@emotion/styled"
import { css } from "@emotion/css"
import Post from "@components/post/post"

interface BlogPageProps {
  posts: string[]
}

const PostsWrapper = styled.div`
  display: flex;
  border: 1px solid #000;
  max-width: 50rem;
  margin: 0 auto 1rem auto;
  flex-flow: column wrap;
`

const titleStyles = css`
  margin-bottom: 2rem;
`

const BlogPage: NextPage<BlogPageProps> = ({ posts }) => {
  return (
    <Layout>
      <TitleWrapper title="Posts" subTitle="running posts" className={titleStyles} />
      <PostsWrapper>
        {posts.map((post) => (
          <Post key={post} slug={post} />
        ))}
      </PostsWrapper>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = fs.readdirSync("posts").map((file) => file.replace(".mdx", ""))

  return {
    props: { posts },
  }
}

export default BlogPage

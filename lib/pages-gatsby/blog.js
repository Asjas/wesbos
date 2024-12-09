import React from 'react';
import { Link, graphql } from 'gatsby';
import format from 'date-fns/format';
import Img from '../../components/Img';
import H from '../../components/mdxComponents/Headings';
import Pagination from '../../components/Pagination';
import { PostMetaTags } from '../../components/MetaTags';
import PostGrid, { PostGridItem } from '../../styles/PostGrid';

export default function Blog({ data, pageContext, location }) {
  if (!data) return <p>Shooooot! No Post found!</p>;
  return (
    <>
      <Pagination currentPage={pageContext.currentPage} totalCount={data.allMdx.totalCount} pathPrefix="/blog/" />
      <PostMetaTags
        post={{
          fields: {
            slug: location.pathname, // TODO: TEST
          },
          frontmatter: {
            slug: location.pathname,
            title: `Blog ${pageContext.currentPage ? `- Page ${pageContext.currentPage}` : ''}`,
          },
        }}
      />
      <PostGrid>
        {data.allMdx &&
          data.allMdx.edges.map(({ node: post }) => {
            const hasImage = !!post.frontmatter.image;
            return (
              <PostGridItem key={post.id} hasImage={hasImage}>
                {post.frontmatter.image && post.frontmatter.image.childImageSharp && (
                  <div>
                    {hasImage && (
                      <Link href={post.fields.slug}>
                        <Img image={post.frontmatter.image} />
                      </Link>
                    )}
                    <div className="postMeta">
                      <time dateTime={post.frontmatter.date}>{format(new Date(post.frontmatter.date), 'MMMM d, yyyy')}</time>
                      <ul className="categories">
                        {post.frontmatter.category.map((cat) => (
                          <li key={cat}>{cat}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
                <div>
                  <H as="h3">
                    <Link href={post.fields.slug}>{post.frontmatter.title}</Link>
                  </H>
                  <p>{post.excerpt}</p>
                </div>
              </PostGridItem>
            );
          })}
      </PostGrid>
      <Pagination currentPage={pageContext.currentPage} totalCount={data.allMdx.totalCount} pathPrefix="/blog/" />
    </>
  );
}

export const pageQuery = graphql`
  query blogPosts($skip: Int! = 0) {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMdx(filter: { fields: { collection: { eq: "post" } } }, sort: { frontmatter: { date: DESC } }, limit: 10, skip: $skip) {
      totalCount
      edges {
        node {
          id
          excerpt
          fields {
            collection
            slug
          }
          frontmatter {
            title
            date
            slug
            category
            image {
              ...ImageFields
            }
          }
        }
      }
    }
  }
`;

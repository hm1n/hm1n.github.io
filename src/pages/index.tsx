import React, { FunctionComponent, useMemo } from 'react';
import PostList from 'components/main/PostList';
import CategoryList, { CategoryListProps } from 'components/main/CategoryList';
import { graphql } from 'gatsby';
import { PostListItemType } from 'types/PostItem.types';
import { IGatsbyImageData } from 'gatsby-plugin-image';
import queryString, { ParsedQuery } from 'query-string';
import Template from 'components/common/Template';

type IndexPageProps = {
  location: {
    search: string;
  };
  data: {
    site: {
      siteMetadata: {
        title: string;
        description: string;
        siteUrl: string;
      };
    };
    allMarkdownRemark: {
      edges: PostListItemType[];
    };
    file: {
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData;
      };
      publicURL: string | null;
    } | null;
  };
};

const IndexPage: FunctionComponent<IndexPageProps> = function ({
  location: { search },
  data: {
    site: {
      siteMetadata: { title, description, siteUrl },
    },
    allMarkdownRemark: { edges },
    file,
  },
}) {
  const shareImageUrl = file?.publicURL ?? '';

  const parsed: ParsedQuery<string> = queryString.parse(search);
  const selectedCategory: string =
    typeof parsed.category !== 'string' || !parsed.category ? 'All' : parsed.category;

  const categoryList = useMemo(
    () =>
      edges.reduce(
        (
          list: CategoryListProps['categoryList'],
          {
            node: {
              frontmatter: { categories },
            },
          }: PostListItemType,
        ) => {
          categories.forEach(category => {
            if (list[category] === undefined) list[category] = 1;
            else list[category]++;
          });

          list['All']++;

          return list;
        },
        { All: 0 },
      ),
    [],
  );

  return (
    <Template title={title} description={description} url={siteUrl} image={shareImageUrl}>
      <CategoryList selectedCategory={selectedCategory} categoryList={categoryList} />
      <PostList selectedCategory={selectedCategory} posts={edges} />
    </Template>
  );
};

export default IndexPage;

export const query = graphql`
  query getPostList {
    site {
      siteMetadata {
        title
        description
        siteUrl
      }
    }
    allMarkdownRemark(sort: [{ frontmatter: { date: DESC } }, { frontmatter: { title: ASC } }]) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            summary
            date(formatString: "YYYY.MM.DD.")
            categories
            thumbnail {
              childImageSharp {
                gatsbyImageData(width: 768, height: 400)
              }
            }
          }
        }
      }
    }
    file(name: { eq: "profile-image" }) {
      publicURL
      childImageSharp {
        gatsbyImageData(width: 120, height: 120)
      }
    }
  }
`;

import React, { FunctionComponent, useRef } from 'react';
import styled from '@emotion/styled';
import { graphql } from 'gatsby';
import { breakpoints } from '../styles/theme';
import Template from 'components/common/Template';
import CommentWidget from 'components/post/CommentWidget';
import PostContent from 'components/post/PostContent';
import PostHead from 'components/post/PostHead';
import PostNavigation from '../components/post/PostNavigation';
import usePostNavigation from 'hooks/usePostNavigation';
import { PostPageItemType } from 'types/PostItem.types';
import { GatsbyImage } from 'gatsby-plugin-image';

const MOBILE_MAX_WIDTH_PX = breakpoints.mobile - 1;

type PostTemplateProps = {
  data: {
    allMarkdownRemark: {
      edges: PostPageItemType[];
    };
  };
  location: {
    href: string;
  };
};

const Main = styled.main`
  flex: 1;
  width: 100%;
  padding: 154px clamp(20px, 10vw, 130px) 0;

  @media (max-width: ${MOBILE_MAX_WIDTH_PX}px) {
    padding: 80px 20px 0;
  }
`;

const Body = styled.div`
  width: 100%;
  max-width: 1020px;
  margin: 0 auto;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 203px;
  grid-template-areas:
    'head postNavigation'
    'body postNavigation';
  column-gap: 29px;
  align-items: start;

  @media (max-width: ${MOBILE_MAX_WIDTH_PX}px) {
    grid-template-columns: 1fr;
    grid-template-areas:
      'head'
      'postNavigation'
      'body';
    column-gap: 0;
  }
`;

const HeadArea = styled.section`
  grid-area: head;
  min-width: 0;
`;

const PostNavigationArea = styled.section`
  height: 100%;
  grid-area: postNavigation;
  min-width: 0;
  /* --post-nav-sticky-top: 154px; */
`;

const BodyArea = styled.section`
  grid-area: body;
  min-width: 0;
`;

const ThumbnailImage = styled(GatsbyImage)`
  width: 100%;
  border-radius: 8px;
  background: var(--color-gray-100);
  overflow: hidden;
  margin-top: 40px;
  margin-bottom: 48px;

  @media (max-width: ${breakpoints.mobile - 1}px) {
    width: 100%;
    margin-bottom: 40px;
  }
`;

const CommentSection = styled.section`
  width: 100%;
  max-width: 1020px;
  /* margin: 0 auto; */
  padding: 120px 0 120px 0;

  @media (max-width: ${MOBILE_MAX_WIDTH_PX}px) {
    padding: 60px 0 40px;
  }
`;

const PostTemplate: FunctionComponent<PostTemplateProps> = function ({
  data: {
    allMarkdownRemark: { edges },
  },
  location: { href },
}) {
  const {
    node: {
      html,
      frontmatter: {
        title,
        summary,
        date,
        categories,
        thumbnail: {
          childImageSharp: { gatsbyImageData },
          publicURL,
        },
      },
    },
  } = edges[0];
  const contentRef = useRef<HTMLDivElement | null>(null);
  const postNavigationAreaRef = useRef<HTMLElement | null>(null);
  const { postNavigationItems, activePostNavigationId, handlePostNavigationSelect } =
    usePostNavigation({
      html,
      contentRef,
      postNavigationAreaRef,
    });

  return (
    <Template title={title} description={summary} url={href} image={publicURL || ''}>
      <Main>
        <Body>
          <HeadArea>
            <PostHead
              thumbnail={gatsbyImageData}
              title={title}
              date={date}
              categories={categories}
              summary={summary}
            />
          </HeadArea>
          <ContentGrid>
            <PostNavigationArea ref={postNavigationAreaRef}>
              <PostNavigation
                items={postNavigationItems}
                activeId={activePostNavigationId}
                onSelect={handlePostNavigationSelect}
              />
            </PostNavigationArea>

            <BodyArea>
              <ThumbnailImage image={gatsbyImageData} alt={title} />
              <PostContent html={html} contentRef={contentRef} />
            </BodyArea>
          </ContentGrid>

          <CommentSection>
            <CommentWidget />
          </CommentSection>
        </Body>
      </Main>
    </Template>
  );
};

export default PostTemplate;

export const queryMarkdownDataBySlug = graphql`
  query queryMarkdownDataBySlug($slug: String) {
    allMarkdownRemark(filter: { fields: { slug: { eq: $slug } } }) {
      edges {
        node {
          html
          frontmatter {
            title
            summary
            date(formatString: "YYYY.MM.DD.")
            categories
            thumbnail {
              childImageSharp {
                gatsbyImageData
              }
              publicURL
            }
          }
        }
      }
    }
  }
`;

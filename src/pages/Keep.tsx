import styled from "styled-components";
import { AuthContext } from "../utils/AuthContextProvider";
import { useContext, useEffect, useState } from "react";
import api from "../utils/api";
import { MerchPost } from "../pages/FansSupport";
import { Link } from "react-router-dom";

const Container = styled.div`
  padding: 20px 80px;
  margin: 0 auto;
  @media (max-width: 992px) {
    padding: 20px 60px;
  }
  @media (max-width: 768px) {
    padding: 20px 40px;
  }
  @media (max-width: 575px) {
    padding: 20px 20px;
  }
`;
const Title = styled.h3`
  font-size: 1.96rem;
  font-weight: 700;
  line-height: 2;
  margin-bottom: 20px;
`;
const Articles = styled.ul``;
const ArticleItem = styled.li`
  background: #00000070;
  color: #fff;
  border-radius: 15px;
  padding: 15px 20px;
  display: flex;
  margin-bottom: 20px;
  min-height: 200px;
  @media (max-width: 768px) {
    min-height: 240px;
  }
  @media (max-width: 575px) {
    flex-direction: column;
  }
`;
const ImgBox = styled.div`
  width: 30%;
  @media (max-width: 575px) {
    width: 100%;
    margin-top: 10px;
  }
`;
const Img = styled.img``;
const ArticleContent = styled.div`
  flex-grow: 1;
`;
const ArticleTitle = styled.div`
  font-weight: 700;
  font-size: 1.2rem;
`;
const StyleLink = styled(Link)`
  color: #fff;
`;
const ArticleText = styled.p`
  color: #ffffff;
  font-size: 1.1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  @media (max-width: 575px) {
    font-size: 1rem;
  }
`;
const ArticlePassBox = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  margin: 5px 0;
  @media (max-width: 768px) {
    grid-template-columns: auto;
  }
`;
const ArticlePass = styled.p`
  color: #ffffff;
  font-size: 1rem;
  font-weight: 700;
  @media (max-width: 575px) {
    font-size: 0.8rem;
  }
`;
function Keep() {
  const authContext = useContext(AuthContext);
  const [keepPosts, setKeepPosts] = useState<MerchPost[]>([]);

  useEffect(() => {
    console.log("sdv");

    const getKeep = async () => {
      if (authContext?.user.keepIds) {
        const res = await api.getKeepMerchPost(authContext?.user.keepIds);
        setKeepPosts(res);
      }
    };
    getKeep();
  }, [authContext?.user.keepIds]);

  return (
    <Container>
      <Title>我的收藏</Title>

      <Articles>
        {keepPosts.map((item) => (
          <ArticleItem key={item.id}>
            <StyleLink to={`/fanssupport?concert=${item.concertId}#${item.id}`}>
              <ArticleContent>
                <ArticleTitle>{item.concertName}</ArticleTitle>
                <ArticlePassBox>
                  <ArticlePass>發放日期：{item.passDay}</ArticlePass>
                  <ArticlePass>發放時間：{item.passTime}</ArticlePass>
                  <ArticlePass>發放地點：{item.passPlace}</ArticlePass>
                  <ArticlePass>發放狀態：{item.passState}</ArticlePass>
                </ArticlePassBox>
                <ArticleText dangerouslySetInnerHTML={{ __html: item.content.replace(/\n/g, "<br />") }}></ArticleText>
              </ArticleContent>
              <ImgBox>
                {" "}
                <Img src={item.image ? item.image[0] : ""} />
              </ImgBox>
            </StyleLink>
          </ArticleItem>
        ))}
      </Articles>
    </Container>
  );
}

export default Keep;

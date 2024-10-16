import styled from "styled-components";
import { AuthContext } from "../utils/AuthContextProvider";
import { useContext, useEffect, useState } from "react";
import api from "../utils/api";
import { MerchPost, Personal } from "../types";
import { Link } from "react-router-dom";

const Container = styled.div`
  padding: 20px 80px;
  margin: 0 auto;
  @media (max-width: 1280px) {
    padding: 20px 60px;
  }
  @media (max-width: 992px) {
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
const Articles = styled.ul`
  display: flex;
  column-gap: 20px;
  flex-wrap: wrap;
`;
const ArticleItem = styled.li`
  background: #fcfcfc;
  color: #000;
  border-radius: 15px;
  padding: 15px 20px;
  margin-bottom: 20px;
  width: 48%;
  @media (max-width: 1280px) {
    width: 98%;
  }
  @media (max-width: 768px) {
  }
  @media (max-width: 575px) {
    flex-direction: column;
  }
`;

const StyleLink = styled(Link)`
  color: #000;
  display: flex;
  justify-content: space-between;
  column-gap: 10px;
  flex-grow: 1;
  @media (max-width: 500px) {
    flex-direction: column;
  }
`;
const ArticleContent = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;
const ArticleTitle = styled.div`
  font-weight: 700;
  font-size: 1.2rem;
  @media (max-width: 575px) {
    font-size: 1.1rem;
  }
`;
const ArticlePassBox = styled.div`
  margin: 10px 0;
  @media (max-width: 575px) {
    margin: 0;
  }
`;
const ArticlePass = styled.p`
  color: #000;
  font-size: 1rem;
  font-weight: 600;
  margin: 8px 0;
  @media (max-width: 575px) {
    margin: 3px 0;
  }
`;

const KeepBtn = styled.button`
  padding: 0;
  color: #fff;
  background: none;
  border: none;
  z-index: 10;
  background: #000;
  width: 100px;
  padding: 5px;
  &:hover {
    background: #383838;
  }
`;
const ImgBox = styled.div`
  width: 200px;
  height: auto;
  text-align: right;
  border-radius: 15px;
  @media (max-width: 768px) {
    width: 40%;
    height: 150px;
    align-self: center;
  }
  @media (max-width: 500px) {
    width: 150px;
    margin: 5px 0 10px;
    text-align: center;
  }
`;
const Img = styled.img`
  border-radius: 15px;
  object-fit: cover;
`;

const Hint = styled.p`
  padding: 10px 15px;
  color: #fff;
  font-size: 1.5rem;
  text-align: center;
  line-height: 2;
`;

function Keep() {
  const authContext = useContext(AuthContext);
  const [keepPosts, setKeepPosts] = useState<MerchPost[]>([]);

  useEffect(() => {
    const getKeep = async () => {
      if (authContext?.user.keepIds) {
        const res = await api.getKeepMerchPost(authContext?.user.keepIds);
        setKeepPosts(res);
      }
    };
    getKeep();
  }, [authContext?.user.keepIds]);

  const handleKeep = async (id: string) => {
    if (authContext?.user.keepIds?.includes(id)) {
      authContext.setUser((prev) => {
        api.updateUser(authContext?.user.id, { UID: prev.UID, avatar: prev.avatar, userName: prev.userName, keepIds: prev.keepIds?.filter((item) => item !== id) });
        return { ...prev, keepIds: prev.keepIds?.filter((item) => item !== id) };
      });
    } else if (authContext?.user.keepIds === undefined || authContext?.user.keepIds?.includes(id) === false) {
      authContext?.setUser((prev: Personal) => {
        const updatedKeepIds = prev.keepIds ? [...prev.keepIds, id] : [id];
        api.setKeepPost(authContext?.loginState as string, id);
        return { ...prev, keepIds: updatedKeepIds };
      });
    }
  };

  return (
    <Container>
      <Title>我的收藏</Title>

      <Articles>
        {keepPosts.length > 0 ? (
          keepPosts.map((item) => (
            <ArticleItem key={item.id}>
              <StyleLink to={`/fanssupport?concert=${item.concertId}#${item.id}`}>
                <ArticleContent>
                  <ArticleTitle>{item.concertName}</ArticleTitle>
                  <ArticlePassBox>
                    <ArticlePass>應援物：{item.item}</ArticlePass>
                    <ArticlePass>
                      時間：{item.passDay}
                      &nbsp; {item.passTime}
                    </ArticlePass>
                    <ArticlePass>地點：{item.passPlace}</ArticlePass>
                    <ArticlePass>狀態：{item.passState}</ArticlePass>
                  </ArticlePassBox>
                </ArticleContent>
                <ImgBox>
                  <Img src={item.image ? item.image[0] : ""} />
                </ImgBox>
              </StyleLink>
              <KeepBtn onClick={() => handleKeep(item.id as string)}>取消收藏</KeepBtn>
            </ArticleItem>
          ))
        ) : (
          <Hint>目前沒有收藏的文章</Hint>
        )}
      </Articles>
    </Container>
  );
}

export default Keep;

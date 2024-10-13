import styled from "styled-components";
import { AuthContext } from "../utils/AuthContextProvider";
import { useContext, useEffect, useState } from "react";
import api from "../utils/api";
import { MerchPost, Personal } from "../types";
import { Link } from "react-router-dom";
import { MdOutlineBookmarkBorder } from "react-icons/md";
import { MdOutlineBookmark } from "react-icons/md";

const StyleKeep = styled(MdOutlineBookmarkBorder)`
  font-size: 1.5em;
  margin-right: 4px;
`;
const StyleKeepFill = styled(MdOutlineBookmark)`
  font-size: 1.5rem;
  margin-right: 4px;
`;
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
const Articles = styled.ul``;
const ArticleItem = styled.li`
  background: #bdbdbd6f;
  color: #fff;
  border-radius: 15px;
  padding: 15px 20px;
  margin-bottom: 20px;
  display: flex;
  align-items: start;
  @media (max-width: 768px) {
  }
  @media (max-width: 575px) {
    flex-direction: column;
  }
`;
const KeepBtn = styled.button`
  padding: 0;
  color: #fff;
  background: none;
  border: none;
  display: flex;
  align-items: center;
  z-index: 10;
`;
const StyleLink = styled(Link)`
  color: #fff;
  display: flex;
  justify-content: space-between;
  column-gap: 10px;
  @media (max-width: 575px) {
    flex-direction: column;
  }
`;
const ArticleContent = styled.div`
  flex-grow: 1;
`;
const ArticleTitle = styled.div`
  font-weight: 700;
  font-size: 1.2rem;
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
  }
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
const ImgBox = styled.div`
  width: 30%;
  border-radius: 15px;
  @media (max-width: 768px) {
    width: 40%;
    margin-top: 10px;
  }
  @media (max-width: 575px) {
    width: 100%;
    margin-top: 10px;
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
    console.log("sdv");

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
      console.log(authContext.user);
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
              <KeepBtn onClick={() => handleKeep(item.id as string)}>
                {Array.isArray(authContext?.user.keepIds) && authContext.user.keepIds.includes(item.id as string) ? <StyleKeepFill /> : <StyleKeep />}
              </KeepBtn>
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
          ))
        ) : (
          <Hint>目前沒有收藏的文章</Hint>
        )}
      </Articles>
    </Container>
  );
}

export default Keep;

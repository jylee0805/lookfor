import { useContext, useEffect } from "react";
import { MdOutlineAdd } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Dialog from "../../components/Dialog";
import Loading from "../../components/Loading";
import VenueHeader from "../../components/VenueHeader";
import { useDialog } from "../../hooks/useDialog";
import { OriginView } from "../../types";
import api from "../../utils/api";
import { AuthContext } from "../../utils/AuthContextProvider";
import { ComponentContext } from "../../utils/ComponentContextProvider";
import { ViewContext } from "../../utils/ViewContextProvider";
import Post from "./Form";
import Rows from "./Rows";
import Seat from "./Seats";
import Sections from "./Section";

const StyleAdd = styled(MdOutlineAdd)`
  font-size: 1.5rem;
  margin-right: 4px;
`;
const Container = styled.div`
  width: 100%;
  max-width: 100vw;
  position: relative;
  padding: 0 20px;
  @media (max-width: 575px) {
    padding: 0 10px;
  }
`;

const Main = styled.main`
  max-width: 75%;
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  @media (max-width: 1280px) {
    max-width: 100%;
    width: 100%;
  }
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;
const SectionHeader = styled.div`
  width: 100%;
  max-width: 100vw;
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: 0 30px;
  @media (max-width: 575px) {
    padding: 0;
  }
`;
const Title = styled.h4`
  font-size: 1.96rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 25px;
  @media (max-width: 575px) {
    font-size: 1.5rem;
  }
`;
const PostViewBtn = styled.button`
  display: flex;
  align-items: center;
  height: 45px;
  width: 140px;
  font-size: 1.2rem;
  font-weight: 600;
  padding: 0 15px;
  background: #ffffff;
  color: #000;
  justify-content: center;
  @media (max-width: 768px) {
    padding: 0 12px;
    height: 40px;
    width: 140px;
  }
  @media (max-width: 575px) {
    height: 36px;
    width: 120px;
  }
`;
const PostVieBtnText = styled.span``;

function View() {
  const navigate = useNavigate();
  const location = useLocation();
  const { section, row, seat } = location.state || {};
  const { isOpen, setIsOpen, closeDialog } = useDialog();
  const authContext = useContext(AuthContext);
  const componentContext = useContext(ComponentContext);
  const { state, dispatch } = useContext(ViewContext);

  useEffect(() => {
    const getSeat = async () => {
      const rows = await api.getRows(section);
      const sectionAry: number[] = Array.isArray(rows) ? rows : [];
      dispatch({ type: "setDefaultSeat", payload: { rowSeats: sectionAry, selectedSection: section, isSelectSection: true, isSelectRow: true, selectedRow: row - 1, selectedSeat: seat - 1 } });
    };
    const timer = setTimeout(() => {
      document.body.style.overflowY = "auto";
      componentContext?.setIsViewLoad(true);
    }, 4000);
    const timerLink = setTimeout(() => {
      if (location.state) {
        getSeat();
      }
    }, 1);

    return () => {
      clearTimeout(timer);
      clearTimeout(timerLink);
    };
  }, []);

  useEffect(() => {
    const getAllSeats = async () => {
      const unsubscribesPost: (() => void)[] = [];

      const unsubscribePost = api.getAllSectionViewPost(async (updatedPosts: OriginView[]) => {
        dispatch({ type: "setAllSectionPost", payload: { allPost: updatedPosts as OriginView[] } });
      });

      unsubscribesPost.push(await unsubscribePost);

      return () => {
        unsubscribesPost.forEach((unsubscribe) => unsubscribe());
      };
    };
    getAllSeats();
  }, [state.viewPosts]);

  const handlePostClick = () => {
    if (authContext?.loginState === null || authContext?.loginState === undefined) {
      setIsOpen(true);
      return;
    }
    dispatch({ type: "togglePostClick", payload: { isPostClick: true, isShowMask: true } });
    document.body.style.overflowY = "hidden";
  };

  const handleConfirm = () => {
    navigate("/login");
    closeDialog();
  };

  return (
    <Container>
      <Dialog isOpen={isOpen} title="您尚未登入" onConfirm={handleConfirm} onCancel={closeDialog} confirmText="前往登入">
        是否前往登入執行更多功能?
      </Dialog>
      {!componentContext?.isViewLoad && <Loading />}
      <VenueHeader />

      <Main>
        <Post />
        <SectionHeader>
          <Title>區域選擇</Title>
          <PostViewBtn onClick={() => handlePostClick()}>
            <StyleAdd />
            <PostVieBtnText>發佈視角</PostVieBtnText>
          </PostViewBtn>
        </SectionHeader>
        <Sections />
        <Rows />
        <Seat />
      </Main>
    </Container>
  );
}

export default View;

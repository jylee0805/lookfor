import { useEffect } from "react";
import styled from "styled-components";

const Container = styled.div``;
const ProfileContainer = styled.div``;
const HeadShot = styled.image``;
const UserName = styled.p``;
const EditBtn = styled.button``;
const PostViewContainer = styled.div``;
const PostSupportContainer = styled.div``;

interface UserViewPost {
  image?: string;
  note?: string;
  content?: string;
  id: string;
  comment?: Comment[];
  concert?: string;
  createdTime?: string;
  row?: number;
  seat?: number;
  section?: string;
  userUID?: string;
  userName?: string;
}

function Profile() {
  useEffect(() => {}, []);

  return (
    <Container>
      <ProfileContainer>
        <HeadShot />
        <UserName></UserName>
        <EditBtn></EditBtn>
      </ProfileContainer>
      <PostViewContainer></PostViewContainer>
      <PostSupportContainer></PostSupportContainer>
    </Container>
  );
}

export default Profile;

export interface Profile {
  avatar: string;
  userName: string;
  UID: string;
  id: string;
  keepIds?: string[];
}

export interface ProfileState {
  profile: Profile;
  viewPosts: PostState[];
  merchPosts: MerchPost[];
  concertNames: string[];
  isEditProfile: boolean;
  editUserName: string;
  selectPhoto: File | null;
  localPhotoUrl: string;
}
export type ProfileAction =
  | { type: "setData"; payload: { profile: Profile; viewPosts: PostState[]; supportPosts: MerchPost[]; concertNames: string[]; editUserName: string } }
  | { type: "toggleIsEditProfile" }
  | { type: "setPhoto"; payload: { selectPhoto: File | null; localPhotoUrl: string } }
  | { type: "setProfile"; payload: { profile: Profile } }
  | { type: "setEditUserName"; payload: { editUserName: string } };

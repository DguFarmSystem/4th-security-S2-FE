export interface PostKakaoSignUpRequestDto {
  code: string;
}

export interface PostKakaoSignUpResponseDto {
  id: string;
  nickname: string;
  email: string;
  profileImageUrl: string;
}

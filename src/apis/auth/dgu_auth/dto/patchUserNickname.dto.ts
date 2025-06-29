export interface PatchUserNicknameRequestDto {
  nickname: string;
}

export interface PatchUserNicknameResponseDto {
  status: number;
  message: string;
  data: null;
}

export interface PostRequestEmailRequestDto {
  email: string;
}

export interface PostRequestEmailResponseDto {
  status: number;
  message: string;
  data: string;
}

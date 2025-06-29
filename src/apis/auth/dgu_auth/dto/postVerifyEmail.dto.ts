export interface PostVerifyEmailRequestDto {
  email: string;
  code: string;
}

export interface PostVerifyEmailResponseDto {
  status: number;
  message: string;
  data: string;
}

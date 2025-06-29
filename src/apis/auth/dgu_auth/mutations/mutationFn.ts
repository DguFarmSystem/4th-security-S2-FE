import {
  DefaultError,
  useMutation,
  UseMutationOptions,
} from '@tanstack/react-query';
import { dguAuthApi } from '../index';
import {
  PostRequestEmailRequestDto,
  PostRequestEmailResponseDto,
  PostVerifyEmailRequestDto,
  PostVerifyEmailResponseDto,
  PatchUserNicknameRequestDto,
  PatchUserNicknameResponseDto,
} from '../dto';

/**
 * @summary 동국대학교 인증 이메일 요청
 * @request POST:/api/auth/email/send
 */
export const usePostRequestEmailMutation = (
  options?: Omit<
    UseMutationOptions<
      PostRequestEmailResponseDto,
      DefaultError,
      PostRequestEmailRequestDto
    >,
    'mutationFn'
  >
) => {
  return useMutation({
    mutationFn: ({ email }: PostRequestEmailRequestDto) =>
      dguAuthApi.postRequestEmail(email),
    ...options,
  });
};

/**
 * @summary 동국대학교 인증 이메일 인증 코드 검증
 * @request POST:/api/auth/email/verify
 */
export const usePostVerifyEmailMutation = (
  options?: Omit<
    UseMutationOptions<
      PostVerifyEmailResponseDto,
      DefaultError,
      PostVerifyEmailRequestDto
    >,
    'mutationFn'
  >
) => {
  return useMutation({
    mutationFn: ({ email, code }: PostVerifyEmailRequestDto) =>
      dguAuthApi.postVerifyEmail(email, code),
    ...options,
  });
};

/**
 * @summary 유저 닉네임 수정
 * @request PATCH:/api/user/nickname
 */
export const usePatchUserNicknameMutation = (
  options?: Omit<
    UseMutationOptions<
      PatchUserNicknameResponseDto,
      DefaultError,
      PatchUserNicknameRequestDto
    >,
    'mutationFn'
  >
) => {
  return useMutation({
    mutationFn: ({ nickname }: PatchUserNicknameRequestDto) =>
      dguAuthApi.patchUserNickname({ nickname }),
    ...options,
  });
};

import {
  DefaultError,
  useMutation,
  UseMutationOptions,
} from '@tanstack/react-query';
import { signInApi } from '../index';
import { PostKakaoSignUpRequestDto, PostKakaoSignUpResponseDto } from '../dto';

/**
 * @summary 회원가입
 * @request POST:/api/signup
 */
export const usePostKakaoSignUpMutation = (
  options?: Omit<
    UseMutationOptions<
      PostKakaoSignUpResponseDto,
      DefaultError,
      PostKakaoSignUpRequestDto
    >,
    'mutationFn'
  >
) => {
  return useMutation({
    mutationFn: (data: PostKakaoSignUpRequestDto) =>
      signInApi.postKakaoSignUp(data),
    ...options,
  });
};

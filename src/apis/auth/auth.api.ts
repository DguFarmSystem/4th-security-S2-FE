import { fetchApiData } from '@/utils/fetchApiData';
import { AxiosInstance } from 'axios';
import {
  PostKakaoSignUpRequestDto,
  PostKakaoSignUpResponseDto,
} from './oauth/dto';
import {
  PostRequestEmailRequestDto,
  PostRequestEmailResponseDto,
  PostVerifyEmailRequestDto,
  PostVerifyEmailResponseDto,
  PatchUserNicknameRequestDto,
  PatchUserNicknameResponseDto,
} from './dgu_auth/dto';

export class AuthApi {
  private readonly instance: AxiosInstance;

  constructor(instance: AxiosInstance) {
    this.instance = instance;
  }

  /**
   * @summary 카카오 회원가입
   * @param data 카카오 인가코드
   * @returns 카카오 회원가입 정보
   * @request POST:/api/kakao/signup
   */
  postKakaoSignUp(data: PostKakaoSignUpRequestDto) {
    return fetchApiData<PostKakaoSignUpResponseDto, PostKakaoSignUpRequestDto>(
      this.instance,
      {
        method: 'POST',
        url: '/api/kakao/signup',
        data,
      }
    );
  }

  /**
   * @summary 동국대학교 인증 이메일 요청
   * @param data 동국대학교 인증 정보
   * @returns 동국대학교 인증 정보
   * @request POST:/api/auth/email/send
   */
  postRequestEmail(email: string) {
    return fetchApiData<
      PostRequestEmailResponseDto,
      PostRequestEmailRequestDto
    >(this.instance, {
      method: 'POST',
      url: '/api/auth/email/send',
      data: {
        email,
      },
    });
  }
  /**
   * @summary 동국대학교 인증 이메일 인증 코드 검증
   * @param email 동국대학교 인증 이메일
   * @param code 동국대학교 인증 코드
   * @returns 동국대학교 인증 이메일 인증 코드 검증 정보
   * @request POST:/api/auth/email/verify
   */
  postVerifyEmail(email: string, code: string) {
    return fetchApiData<PostVerifyEmailResponseDto, PostVerifyEmailRequestDto>(
      this.instance,
      {
        method: 'POST',
        url: '/api/auth/email/verify',
        data: {
          email,
          code,
        },
      }
    );
  }

  /**
   * @summary 유저 닉네임 수정
   * @param data 유저 닉네임 수정 정보
   * @returns 유저 닉네임 수정 정보
   * @request PATCH:/api/user/nickname
   */
  patchUserNickname(data: PatchUserNicknameRequestDto) {
    return fetchApiData<
      PatchUserNicknameResponseDto,
      PatchUserNicknameRequestDto
    >(this.instance, {
      method: 'PATCH',
      url: '/api/user/nickname',
      data,
    });
  }
}

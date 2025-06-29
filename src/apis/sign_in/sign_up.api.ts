import { fetchApiData } from '@/utils/fetchApiData';
import { AxiosInstance } from 'axios';
import { PostKakaoSignUpRequestDto, PostKakaoSignUpResponseDto } from './dto';

export class SignUpApi {
  private readonly instance: AxiosInstance;

  constructor(instance: AxiosInstance) {
    this.instance = instance;
  }

  /**
   * @summary 카카오 회원가입
   * @param data 카카오 회원가입 정보
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
}

import { useEffect } from 'react';
import { PATH } from '@/constants/path';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';

export default function KakaoLogin() {
  const { setAccessToken, setIsGuest, setIsUnivAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const loginProcess = async () => {
      try {
        // 실제 서버 API 호출로 대체 필요
        const mockUserData = {
          id: 'kakao-123',
          nickname: '꾸기',
          isVerifiedSchoolEmail: false, // 서버에서 받아온 학교 인증 상태
          isGuest: false,
        };

        // 상태 업데이트
        setAccessToken('kakao-token');
        setIsGuest(false);
        setIsUnivAuthenticated(mockUserData.isVerifiedSchoolEmail);

        // 학교 인증 상태에 따라 리다이렉트
        if (mockUserData.isVerifiedSchoolEmail) {
          navigate(PATH.SIGN_IN);
        } else {
          navigate(PATH.DGU_AUTHENTICATION);
        }
      } catch (error) {
        console.error('카카오 로그인 처리 오류', error);

        // 에러 처리 필요
      }
    };

    loginProcess();
  }, [navigate, setAccessToken, setIsGuest, setIsUnivAuthenticated]);

  return <div>카카오 로그인 처리중...</div>;
}

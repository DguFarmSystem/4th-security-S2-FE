import {
  OAuthProvider,
  OauthProvider,
  OAuthConfig,
} from '@/types/oauth/oauthType';

export const useOauth = () => {
  const oauthConfig: Record<OAuthProvider, OAuthConfig> = {
    [OauthProvider.KAKAO]: {
      baseUrl: 'https://kauth.kakao.com/oauth/authorize',
      config: {
        client_id: import.meta.env.VITE_KAKAO_REST_API_KEY,
        redirect_uri: import.meta.env.VITE_KAKAO_REDIRECT_URL,
        response_type: 'code',
      },
    },
  };

  const handleOauth = (provider: OAuthProvider) => {
    const { baseUrl, config } = oauthConfig[provider];
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    window.location.href = finalUrl;
  };

  return { handleOauth };
};

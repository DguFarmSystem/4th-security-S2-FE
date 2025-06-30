import { OAuthProvider } from '@/types/oauth/oauthType';

export type ROUTE_TYPE = 'PRIVATE' | 'PUBLIC';

/* 페이지 경로 정의 */
export const PATH = {
  ROOT: '/',
  WELCOME: '/welcome',
  SIGN_IN: '/sign_in',
  DGU_AUTHENTICATION: '/dgu_authentication',
  OAUTH_CALLBACK: (provider: OAuthProvider) => `/oauth/${provider}/callback`,
  ARTICLE_DETAIL: (id: string) => `/article/${id}`,
  FORM: (formId: string) => `/form/${formId}`,
  EDIT: '/edit',
} as const;

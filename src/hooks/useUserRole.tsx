import { useAuthStore } from '@/stores/authStore';

export const USER_ROLE = {
  FIRST_VISIT: 'firstVisit',
  GUEST: 'guest',
  OAUTH_AUTHED: 'oauthAuthenticated',
  UNIV_AUTHED: 'univAuthenticated',
} as const;

export type UserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];

export const useUserRole = (): { userRole: UserRole } => {
  const { isGuest, isUnivAuthenticated, accessToken } = useAuthStore();

  const userRole = (() => {
    if (isGuest) return USER_ROLE.GUEST;
    if (!accessToken) return USER_ROLE.FIRST_VISIT;
    if (isUnivAuthenticated) return USER_ROLE.UNIV_AUTHED;
    return USER_ROLE.OAUTH_AUTHED;
  })();

  return { userRole };
};

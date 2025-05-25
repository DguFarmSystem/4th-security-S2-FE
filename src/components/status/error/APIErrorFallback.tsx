import { FallbackProps } from 'react-error-boundary';
import { isAxiosError } from 'axios';
import { getAPIErrorInfo } from '@/utils/getApiErrorInfo';
import ErrorPage from './ErrorPage';
import { useAuthStore } from '@/stores/authStore';
import { Navigate } from 'react-router-dom';
import { PATH } from '@/constants/path';

export const APIErrorFallback = ({
  error,
  resetErrorBoundary,
}: FallbackProps) => {
  const { clearAuth } = useAuthStore();

  if (isAxiosError(error)) {
    const errorInfo = getAPIErrorInfo(error);

    if (errorInfo.status === '401') {
      clearAuth();
      return <Navigate to={PATH.WELCOME} replace />;
    }

    return (
      <ErrorPage
        status={errorInfo.status}
        message={errorInfo.message}
        isUnknownError={errorInfo.status === 'ERROR'}
        onRetry={resetErrorBoundary}
      />
    );
  } else {
    throw error;
  }
};

import { instance } from '@/apis/instance';
import { AuthApi } from '../auth.api';

export const signInApi = new AuthApi(instance);

import { instance } from '@/apis/instance';
import { AuthApi } from '../auth.api';

export const dguAuthApi = new AuthApi(instance);

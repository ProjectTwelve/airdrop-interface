import { LoginParams, UserInfo } from '@/lib/types-nest';
import request, { Response } from '@/lib/request-nest';

export const fetchLogin = (data: LoginParams) => request.post<any, Response<UserInfo>>('/auth/login', data);

import { LoginParams, PowerLevelResult, UserInfo } from '@/lib/types-nest';
import request, { Response } from '@/lib/request-nest';
import { Address } from 'wagmi';

export const fetchLogin = (data: LoginParams) => request.post<any, Response<UserInfo>>('/auth/login', data);

export const fetchPowerLevel = (address?: Address) =>
  request.get<any, Response<PowerLevelResult>>(`/arcana/power-vote/${address}`);

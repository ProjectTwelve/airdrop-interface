import {
  ChainNamesResult,
  CheckNameParams,
  CheckResult,
  GameInfo,
  InvitationInfo,
  LoginParams,
  PowerLevelResult,
  PowerVoteResult,
  ProfileParams,
  TasksStatus,
  UserInfo,
  UserPowerLevel,
} from '@/lib/types-nest';
import request, { Response } from '@/lib/request-nest';
import { Address } from 'wagmi';

export const fetchLogin = (data: LoginParams) => request.post<any, Response<UserInfo>>('/auth/login', data);

export const fetchPowerLevel = (address?: Address) =>
  request.get<any, Response<PowerLevelResult>>(`/arcana/power-vote/${address}`);

export const fetchPowerVote = () => request.get<any, Response<PowerVoteResult>>('/arcana/power-vote');

export const fetchUserInfo = () => request.get<any, Response<UserInfo>>('/app/profile');

export const checkNameAvailable = (data: CheckNameParams) =>
  request.post<any, Response<CheckResult>>('/app/profile/check/name', data);
export const updateChainNames = () => request.post<any, Response<ChainNamesResult>>('/app/profile/chain-names');

export const editProfileData = (data: ProfileParams) => request.post<any, Response<boolean>>('/app/profile', data);

export const fetchUserSubmittedList = () => request.get<any, Response<GameInfo[]>>('/arcana/game/submitted');
export const fetchUserNotSubmittedList = () => request.get<any, Response<GameInfo[]>>('/arcana/game/not-submitted');

export const fetchTasksStatus = () => request.get<any, Response<TasksStatus>>('/arcana/task');

export const fetchInviteHistory = (code: string) =>
  request.get<any, Response<InvitationInfo[]>>('/invitation/history/' + code, { params: { field: 'editorium' } });

export const fetchUserPowerLevel = (address?: string) =>
  request.get<any, Response<UserPowerLevel>>('/assets/dashboard/pl/' + address);

import { NextApiRequest, NextApiResponse } from 'next';
import { CollabShortInfo, Response } from '../../../lib/types';
import { mockCollabList } from '../../../temp/mock';

export default function collabListHandler(req: NextApiRequest, res: NextApiResponse<Response<CollabShortInfo[]>>) {
  res.status(200).json({
    status: 'success',
    msg: 'success',
    code: 0,
    data: mockCollabList,
  });
}

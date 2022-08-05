import { NextApiRequest, NextApiResponse } from 'next';
import { CollabInfoType, Response } from '../../../lib/types';
import { mockCollabInfoList } from '../../../temp/mock';

export default function collabItemHandler(req: NextApiRequest, res: NextApiResponse<Response<CollabInfoType | null>>) {
  const { id } = req.query;
  const item = mockCollabInfoList.find((item) => item.id === id);
  if (item) {
    res.status(200).json({
      status: 'success',
      code: 0,
      msg: 'success',
      data: item,
    });
  } else {
    res.status(404).json({
      status: 'success',
      code: -1,
      msg: 'not found',
      data: null,
    });
  }
}

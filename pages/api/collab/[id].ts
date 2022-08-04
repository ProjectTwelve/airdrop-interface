import { NextApiRequest, NextApiResponse } from 'next';
import { CollabShortInfo, Response } from '../../../lib/types';
import { mockCollabList } from '../../../temp/mock';

export default function collabItemHandler(req: NextApiRequest, res: NextApiResponse<Response<CollabShortInfo | null>>) {
  const { id } = req.query;
  const item = mockCollabList.find((item) => item.id === id);
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

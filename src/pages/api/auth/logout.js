import getSqlClient from '../../../sql/sqlClient';
import { errorCodes } from '../../../constants';
import { createApiErrorMessage } from '../../../utils';
import { verifyToken } from '../../../utils/middleware';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    await verifyToken(req, res);
    const { decodedToken, user, authenticated } = req.auth;

    if (!authenticated) {
      return res.status(200).end();
    }

    const { User } = await getSqlClient();

    try {
      await User.update({ sessionId: null }, { where: { id: user.id, sessionId: decodedToken.jti } })
    } catch (error) {
      console.log(error);
      return res.status(500).json(createApiErrorMessage(errorCodes.UNEXPECTED_ERROR));
    }

    return res.status(200).end();
  }

  return res.status(404).end();
}

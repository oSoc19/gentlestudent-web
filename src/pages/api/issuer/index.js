import { Issuer, User } from '../../../sql/sqlClient';
import { verifyToken } from '../../../utils/middleware';
import { hasRole, createApiErrorMessage } from '../../../utils';
import { roles, errorCodes } from '../../../constants';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    await verifyToken(req, res);
    const { user, authenticated } = req.auth;

    if (!authenticated || !hasRole(user, roles.ADMIN)) {
      return res.status(401).end();
    }

    let issuers;
    try {
      issuers = await Issuer.findAll({
        where: {
          ...(!!req.query.validated && { validated: req.query.validated }),
          ...(!!req.query.userId && { userId: req.query.userId })
        },
        include: [{ model: User, as: 'user' }]
      });
    } catch (error) {
      console.error(error);
      return req.status(500).json(createApiErrorMessage(errorCodes.ERROR_GETTING_ISSUER));
    }
    return res.json(issuers);
  }
  return res.status(404).end();
}

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

    const issuerId = req.query.id;
    if (!issuerId) {
      return res.status(400).json(createApiErrorMessage(errorCodes.MISSING_ISSUER_ID));
    }

    try {
      await Issuer.update({
        validated: true
      }, {
        where: {
          id: issuerId
        }
      });
      const issuer = await Issuer.findOne({
        where: { id: issuerId },
        attributes: ['userId']
      });
      await User.update({
        role: 'issuer'
      }, {
        where: {
          id: issuer.userId
        }
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json(createApiErrorMessage(errorCodes.UNEXPECTED_ERROR));
    }
    return res.send('ok');
  }
  return res.status(404).end();
}
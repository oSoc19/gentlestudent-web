import getSqlClient from '../../../sql/sqlClient';
import { verifyToken } from '../../../utils/middleware';
import { hasRole, createApiErrorMessage } from '../../../utils';
import { roles, errorCodes } from '../../../constants';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    await verifyToken(req, res);
    const { user, authenticated } = req.auth;

    if (!authenticated || !hasRole(user, roles.PARTICIPANT)) {
      return res.status(401).end();
    }

    const { Assertion, User, Badge } = await getSqlClient();

    try {
      if (req.query.badges === '') {
        req.query.badges = '0'; // if the 'badges' query parameter is defined but the list is empty we should return an empty list of assertions
      }
      const options = {
        where: {
          ...(!!req.query.recipient && { recipientId: req.query.recipient }),
          ...(!!req.query.badges && { badgeId: req.query.badges.split(',') })
        },
        include: [{
          model: User,
          as: 'recipient',
          attributes: { exclude: ['password', 'emailVerificationId', 'sessionId'] }
        },
        {
          model: Badge,
          as: 'badge'
        }]
      };
      const [count, assertions] = await Promise.all([
        Assertion.count({ where: options.where }),
        Assertion.findAll(options)
      ]);
      return res.json({
        data: assertions,
        count,
        page: options.offset,
        limit: options.limit
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json(createApiErrorMessage(errorCodes.UNEXPECTED_ERROR));
    }
  }

  return res.status(404).end();
}
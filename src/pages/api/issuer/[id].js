import { Issuer, User } from '../../../sql/sqlClient';
import { buildIssuer } from '../../../badges';

export default async function handler(req, res) {
  const { id } = req.query;
  try {
    const issuer = await Issuer.findOne({
      where: {
        id,
        validated: true
      },
      include: { model: User, as: 'user' }
    });
    if (!issuer) {
      return res.status(404).end();
    }
    return res.json(buildIssuer(issuer));
  } catch (error) {
    console.error(error);
    return res.status(500).end('ERROR_GETTING_ISSUER');
  }
}

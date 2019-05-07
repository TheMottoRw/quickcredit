import quickcredit from '../models/database';

export const loadLoans = (req, res) => {
  if (req.body.status === undefined && req.body.repaid === undefined) {
    res.json(quickcredit.loans);
  } else {
    loadByCriteria(req, res);
  }
};

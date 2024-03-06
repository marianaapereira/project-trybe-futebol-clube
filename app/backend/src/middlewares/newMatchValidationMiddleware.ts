import { Request, Response, NextFunction } from 'express';
import { HTTP_UNPROCESSABLE_ENTITY_STATUS } from '../consts/httpStatusCodes.consts';

function newMatchValidation(req: Request, res: Response, next: NextFunction) {
  const { homeTeamId, awayTeamId } = req.body;

  if (homeTeamId === awayTeamId) {
    return res.status(HTTP_UNPROCESSABLE_ENTITY_STATUS).json(
      { message: 'It is not possible to create a match with two equal teams' },
    );
  }

  next();
}

export default newMatchValidation;

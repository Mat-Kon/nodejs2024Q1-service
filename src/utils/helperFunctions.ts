import { HttpException } from '@nestjs/common';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { validate } from 'uuid';

const isValidUUID = (id: string) => {
  const isValidId = validate(id);
  if (!isValidId) {
    throw new HttpException(ReasonPhrases.BAD_REQUEST, StatusCodes.BAD_REQUEST);
  }
};

export { isValidUUID };

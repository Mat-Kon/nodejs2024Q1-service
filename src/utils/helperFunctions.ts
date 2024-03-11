import { HttpException } from '@nestjs/common';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { validate } from 'uuid';

const isValidUUID = (id: string) => {
  const isValidId = validate(id);
  if (!isValidId) {
    throw new HttpException(ReasonPhrases.BAD_REQUEST, StatusCodes.BAD_REQUEST);
  }
};

function findItemsInCategory<T extends { id: string }>(
  category: T[],
  itemsId: string[],
): T[] {
  const items = itemsId
    .map((id) => category.find((item) => item.id === id))
    .filter(Boolean);
  return items;
}

function removeFromFavorites(favorites: string[], id: string) {
  const indexInFavorites = favorites.findIndex((item) => item === id);
  if (indexInFavorites !== -1) {
    favorites.splice(indexInFavorites, 1);
  }
}

export { isValidUUID, findItemsInCategory, removeFromFavorites };

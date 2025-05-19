import { ClassPrice } from '@prisma/client';

export type ClassPriceResponse = {
  id: number;
  price: number;
  createdBy: number | null;
};

export type CreateClassPriceRequest = {
  price: number;
};

export type UpdateClassPriceRequest = {
  id: number;
  price: number;
};

export function toClassPriceResponse(
  classPrice: ClassPrice,
): ClassPriceResponse {
  return {
    id: classPrice.id,
    price: classPrice.price,
    createdBy: classPrice.createdBy,
  };
}

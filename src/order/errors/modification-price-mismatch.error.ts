import { ApplicationError } from 'src/errors';

export class ModificationPriceMismatchError extends ApplicationError {
  message = 'Цена модификаций не совпадает с актуальной ценой';
}

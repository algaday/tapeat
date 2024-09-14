import { ApplicationError } from 'src/errors';

export class DeliveryFeeTemplateInitialValueError extends ApplicationError {
  message = 'Шаблон цен должен начинаться с 0!';
}

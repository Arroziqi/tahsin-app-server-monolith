import { ResponseError } from '../../common/type/responseError';

export class BadRequest extends ResponseError {
  constructor(public message: string) {
    super(400, 'Bad Request', message);
  }
}

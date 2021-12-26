import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateUserAvatarUseCase } from './UpdateUserAvatarUseCase';

class UpdateUserAvatarController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.user;

      const avatar_file = request.file.filename;

      const updateUserAvatarUseCase = container.resolve(
        UpdateUserAvatarUseCase,
      );

      await updateUserAvatarUseCase.execute({ user_id: id, avatar_file });

      return response.status(204).send();
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

export { UpdateUserAvatarController };

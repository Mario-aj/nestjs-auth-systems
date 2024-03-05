import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  findOne(username: string): Promise<(typeof this.users)[0] | undefined> {
    return Promise.resolve(
      this.users.find((user) => user.username === username),
    );
  }
}

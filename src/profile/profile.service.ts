import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProfileService {

  constructor(private prisma: PrismaService) { }

  async updateUser(userId: number, data: any) {
    try {
      await this.prisma.user.update({
        where: { id: userId },
        data,
      });
      return { code: 0, message: "User updated successfully" };
    }
    catch (error: any) {
      if (error.code === 'P2002') {
      const target = error.meta?.target;

      if (target === 'User_username_key') {
        return {
          code: -1,
          message: "The username you provided is already in use. Please choose a different one."
        };
      }

      if (target === 'User_bvn_key') {
        return {
          code: -1,
          message: "This BVN is already associated with another user."
        };
      }
    }

    return {
      code: -1,
      message: "An error occurred while updating the user. Please try again."
    };
    }

  }

}

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
      console.log("Update user error: ", error);
      return {
        code: -1,
        message: error?.message
      };
    }

  }

}

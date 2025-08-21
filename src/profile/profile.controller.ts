import * as jwt from 'jsonwebtoken';
import { Controller, Patch, Body, Req, Res, UseGuards } from '@nestjs/common';
import { ProfileDto } from './dto/profile.dto';
import { ProfileService } from './profile.service';
import { RequestWithUser } from '../types/request-with-user';
import { decodeAndValidateToken } from 'src/common/utils/decodeAndValidate';
import { Response } from 'express';
import { signAndSendError } from 'src/common/utils/signAndSendError';
import { UpdateProfileDocs } from 'src/common/docs/profile/public-profile.docs';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('v1/users')
export class ProfileController {
    constructor(private readonly usersService: ProfileService) {}

    @UpdateProfileDocs()
    @Patch('me')
    @UseGuards(AuthGuard)
    async updateProfile(@Res() res: Response, @Req() req: RequestWithUser, @Body() body: any) {
        try {
            const payload = decodeAndValidateToken(body.token, process.env.PROFILE_SECRET, ProfileDto);
            const user = req.user; 
            const update = await this.usersService.updateUser(user.id, payload);
            const responsePayload = {
                message: update.message
            };
            const token = jwt.sign(responsePayload, process.env.PROFILE_SECRET, {
                expiresIn: '1h',
            });
    
            const statusCode = update.code !== 0 ? 400 : 200;
            return res.status(statusCode).json({ result: token });
        }
        catch (error: any) {
            return signAndSendError(res, error, process.env.PROFILE_SECRET);
        }
    }
}

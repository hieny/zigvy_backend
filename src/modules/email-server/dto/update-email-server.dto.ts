import { PartialType } from '@nestjs/mapped-types';
import { CreateEmailServerDto } from './create-email-server.dto';

export class UpdateEmailServerDto extends PartialType(CreateEmailServerDto) {}

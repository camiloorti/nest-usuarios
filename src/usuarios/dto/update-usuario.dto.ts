import { PartialType } from '@nestjs/mapped-types';
import { CreateusuarioDto } from './create-usuario.dto';


export class UpdateUsuarioDto extends PartialType(CreateusuarioDto) {}

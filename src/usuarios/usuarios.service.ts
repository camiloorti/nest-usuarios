import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';



import { Usuario } from './entities/usuario.entity';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { CreateusuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuariosService {

  private readonly logger = new Logger('UsuariosService')

  constructor(

    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>

  ) {}

  async create(createUsuarioDto: CreateusuarioDto) {

    try {

      const usuario = this.usuarioRepository.create(createUsuarioDto);
      await this.usuarioRepository.save( usuario );

      return usuario;
      
    } catch (error) {
     this.handleDBExceptions(error);
    }
   
  }

  //TODO: paginar
  findAll( paginationDto: PaginationDto) {

    const { limit = 10, offset = 0 } = paginationDto;

    return this.usuarioRepository.find({
      take: limit,
      skip: offset,
      // TODO: relaciones
    })
  }

  async findOne( id: string) {

    const usuario =  await this.usuarioRepository.findOneBy({ id });

    if ( !usuario ) 
      throw new NotFoundException(`Usuario with id ${ id } not found`)

      return usuario;
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  async remove(id: string) {
    const usuario = await this.findOne( id )
     await this.usuarioRepository.remove( usuario );
  }


  private handleDBExceptions( error: any ) {

    if ( error.code === '23505' )
    throw new BadRequestException(error.detail);
    
    this.logger.error(error)
    //console.log(error)
    throw new InternalServerErrorException('Unexpected error,check server logs');

  }
}

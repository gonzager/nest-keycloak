import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ContactosService } from './contactos.service';
import { CreateContactoDto } from './dto/create-contacto.dto';
import { UpdateContactoDto } from './dto/update-contacto.dto';
import { Contacto } from './entities/contacto.entity';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { AuthenticatedUser, Unprotected } from 'nest-keycloak-connect';

@ApiTags('contactos')
@Controller('contactos')
export class ContactosController {
  constructor(private readonly contactosService: ContactosService) {}

  @Post()
  create(@Body() createContactoDto: CreateContactoDto) {
    return this.contactosService.create(createContactoDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    type: [Contacto],
  })
  findAll() {
    return this.contactosService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    type: Contacto,
  })
  @ApiResponse({
    status: 404,
    description: 'Contacto no encontrado',
  })
  findOne(@Param('id') id: string, @AuthenticatedUser() user: any) {
    console.log(user.preferred_username);
    return this.contactosService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateContactoDto: UpdateContactoDto,
  ) {
    return this.contactosService.update(+id, updateContactoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactosService.remove(+id);
  }
}

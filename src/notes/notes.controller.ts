import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  ValidationPipe,
  ParseIntPipe,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from '../users/entities/user.entity';

@Controller('notes')
@UseGuards(JwtAuthGuard)
export class NotesController {
constructor(private notesService: NotesService) {}

@Post()
create(
    @Body(ValidationPipe) createNoteDto: CreateNoteDto,
    @GetUser() user: User,
    ) {
        return this.notesService.create(createNoteDto, user.id);
    }

@Get()
findAll(@GetUser() user: User) {
    return this.notesService.findAllByUser(user.id);
}

@Get(':id')
async findOne(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    const note = await this.notesService.findOne(id);

    if (!note) {
        throw new NotFoundException('Note not found');
    }

    if (note.userId !== user.id) {
    throw new ForbiddenException(
        'You do not have permission to access this note',
    );
    }

    return note;
}

@Put(':id')
async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateNoteDto: UpdateNoteDto,
    @GetUser() user: User,
) {
    const note = await this.notesService.findOne(id);

    if (!note) {
    throw new NotFoundException('Note not found');
    }

    if (note.userId !== user.id) {
    throw new ForbiddenException(
        'You do not have permission to update this note',
    );
    }

    return this.notesService.update(id, updateNoteDto);
}

@Delete(':id')
async remove(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    const note = await this.notesService.findOne(id);

    if (!note) {
        throw new NotFoundException('Note not found');
    }

    if (note.userId !== user.id) {
    throw new ForbiddenException(
        'You do not have permission to delete this note',
    );
    }

    return this.notesService.remove(id);
    }
}

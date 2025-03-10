import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import type { Repository } from "typeorm"
import { Note } from "./entities/note.entity"
import type { CreateNoteDto } from "./dto/create-note.dto"
import type { UpdateNoteDto } from "./dto/update-note.dto"
import { Logger } from "@nestjs/common"

@Injectable()
export class NotesService {
  private readonly logger = new Logger(NotesService.name);
  constructor(
    @InjectRepository(Note)
    private notesRepository: Repository<Note>,
  ) {}

  async create(createNoteDto: CreateNoteDto, userId: number): Promise<Note> {
    const note = this.notesRepository.create({
      ...createNoteDto,
      userId,
    })

    return this.notesRepository.save(note)
  }

  async findAllByUser(userId: number): Promise<Note[]> {
    return this.notesRepository.find({
      where: { userId },
      order: { updatedAt: "DESC" },
    })
  }

  async findOne(id: number): Promise<Note | null> {
    return this.notesRepository.findOne({ where: { id } })
  }

  async update(id: number, updateNoteDto: UpdateNoteDto): Promise<Note> {
    this.logger.log(`Updating note with ID: ${id}: ${JSON.stringify(updateNoteDto)}`)
    await this.notesRepository.update(id, updateNoteDto)

    const updatedNote = await this.findOne(id)
    if (!updatedNote) {
      throw new Error(`Note with ID ${id} not found after update`)
    }
    this.logger.log(`Note updated successfully`)

    return updatedNote
  }

  async remove(id: number): Promise<void> {
    await this.notesRepository.delete(id)
  }
}


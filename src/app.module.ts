import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { NotesModule } from './notes/notes.module';
import { User } from './users/entities/user.entity';
import { Note } from './notes/entities/note.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql', 
        host: configService.get('DB_HOST', 'localhost'),
        port: parseInt(configService.get('DB_PORT', '3306')),
        username: configService.get('DB_USER', 'root'), 
        password: configService.get('DB_PASSWORD', ''),
        database: configService.get('DB_NAME', 'proyect'), 
        entities: [User, Note],
        synchronize: true, 
        logging: true,
      }),
    }),
    AuthModule,
    UsersModule,
    NotesModule,
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ChampionsModule } from './champions/champions.module';
import { HabitLogsModule } from './habit-logs/habit-logs.module';

@Module({
  imports: [UsersModule, ChampionsModule, HabitLogsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { HabitLogsService } from './habit-logs.service';
import { CreateHabitLogDto } from './dto/create-habit-log.dto';

@Controller('habit-logs')
export class HabitLogsController {
    constructor(private readonly habitLogsService: HabitLogsService) {}

    @Post()
    create(@Body() dto: CreateHabitLogDto) {
        return this.habitLogsService.createLog(dto);
    }

    @Get('user/:userId')
    findByUser(@Param('userId') userId: string) {
        return this.habitLogsService.getLogsByUser(userId);
    }
}

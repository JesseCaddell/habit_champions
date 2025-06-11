import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateHabitLogDto } from './dto/create-habit-log.dto';

const prisma = new PrismaClient();

@Injectable()
export class HabitLogsService {
    async createLog(data: CreateHabitLogDto) {
        // Create a habit log
        const log = await prisma.habitLog.create({
            data: {
                userId: data.userId,
                championId: data.championId,
                task: data.task,
                xpEarned: data.xpEarned,
            },
        });

        // Update XP on the champion
        await prisma.champion.update({
            where: { id: data.championId },
            data: {
                xp: { increment: data.xpEarned },
            },
        });

        return log;
    }

    async getLogsByUser(userId: string) {
        return prisma.habitLog.findMany({
            where: { userId },
            orderBy: { timestamp: 'desc' },
        });
    }
}

import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateHabitLogDto } from './dto/create-habit-log.dto';
import { getXpRequiredForLevel } from '../utils/xp-utils';
import { STAT_GROWTH } from '../utils/stat-growth';

const prisma = new PrismaClient();

@Injectable()
export class HabitLogsService {
    async createLog(data: CreateHabitLogDto) {
        // Step 1: Get the latest log for this champion
        const lastLog = await prisma.habitLog.findFirst({
            where: {
                championId: data.championId,
            },
            orderBy: {
                timestamp: 'desc',
            },
        });

        // Determine streak logic
        const today = new Date();
        today.setHours(0, 0, 0, 0); // normalize to start of day

        let streakCount = 1;
        let continuedStreak = false;
        let bonusXP = 0;

        if (lastLog) {
            const lastDate = new Date(lastLog.timestamp);
            lastDate.setHours(0, 0, 0, 0); // normalize

            const diff = (today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24);

            if (diff === 0) {
                // Already logged today — streak doesn't change
                const champion = await prisma.champion.findUnique({
                    where: { id: data.championId },
                });

                streakCount = champion?.streakCount ?? 1;
            } else if (diff === 1) {
                // Yesterday was last log — streak continues
                continuedStreak = true;

                const champion = await prisma.champion.findUnique({
                    where: { id: data.championId },
                });

                streakCount = (champion?.streakCount ?? 0) + 1;
                bonusXP = streakCount * 2;
            }
        }

        const totalXP = data.xpEarned + bonusXP;

        // Step 2: Create the log
        const log = await prisma.habitLog.create({
            data: {
                userId: data.userId,
                championId: data.championId,
                task: data.task,
                xpEarned: totalXP,
            },
        });

        const champion = await prisma.champion.findUnique({
            where: { id: data.championId },
        });

        if (!champion) throw new Error('Champion not found');

        const maxLevel = 50;
        let newXP = champion.xp + totalXP;
        let newLevel = champion.level;
        let leveledUp = false;

        while (
            newLevel < maxLevel &&
            newXP >= getXpRequiredForLevel(newLevel + 1)
            ) {
            newXP -= getXpRequiredForLevel(newLevel + 1);
            newLevel++;
            leveledUp = true;

            const growth = STAT_GROWTH[champion.archetypeClass as keyof typeof STAT_GROWTH];
            if (growth) {
                champion.hp += growth.hp;
                champion.mp += growth.mp;
                champion.str += growth.str;
                champion.int += growth.int;
                champion.wis += growth.wis;
                champion.agi += growth.agi;
                champion.dex += growth.dex;
                champion.lck += growth.lck;
            }
        }

        const updatedChampion = await prisma.champion.update({
            where: { id: data.championId },
            data: {
                xp: newXP,
                level: newLevel,
                streakCount,
                hp: champion.hp,
                mp: champion.mp,
                str: champion.str,
                int: champion.int,
                wis: champion.wis,
                agi: champion.agi,
                dex: champion.dex,
                lck: champion.lck,
            },
        });

        return {
            log,
            champion: updatedChampion,
            levelUp: leveledUp,
            streakBonus: bonusXP > 0 ? bonusXP : null,
            continuedStreak,
        };
    }


    async getLogsByUser(userId: string) {
        return prisma.habitLog.findMany({
            where: { userId },
            orderBy: { timestamp: 'desc' },
        });
    }
}


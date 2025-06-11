import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { AdoptChampionDto } from './dto/adopt-champion.dto';

const prisma = new PrismaClient();

@Injectable()
export class ChampionsService {
    async findAll() {
        return prisma.champion.findMany();
    }

    async adoptChampion(data: AdoptChampionDto) {
        const base = await prisma.champion.findUnique({
            where: { id: data.baseChampionId },
        });

        if (!base || base.userId) {
            throw new Error('Base champion not found or is not a system-defined archetype.');
        }

        const newChampion = await prisma.champion.create({
            data: {
                name: base.name,
                archetypeClass: base.archetypeClass,
                level: 1,
                xp: 0,
                hp: base.hp,
                mp: base.mp,
                str: base.str,
                int: base.int,
                wis: base.wis,
                agi: base.agi,
                dex: base.dex,
                lck: base.lck,
                profileImageUrl: base.profileImageUrl,
                spriteImageUrl: base.spriteImageUrl,
                userId: data.userId,
            },
        });

        return newChampion;
    }
}

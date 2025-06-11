import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'csv-parser';

const prisma = new PrismaClient();

async function main() {
    const champions: any[] = [];

    const csvPath = path.join(__dirname, 'Champion_Archetypes.csv');
    const parser = fs.createReadStream(csvPath).pipe(csv());

    for await (const row of parser) {
        champions.push({
            name: row.name,
            ArchetypeClass: row.theme,
            level: 1,
            xp: 0,
            hp: parseInt(row.hp),
            mp: parseInt(row.mp),
            str: parseInt(row.str),
            int: parseInt(row.int),
            wis: parseInt(row.wis),
            agi: parseInt(row.agi),
            dex: parseInt(row.dex),
            lck: parseInt(row.lck),
            profileImageUrl: row.profileImageUrl,
            spriteImageUrl: row.spriteImageUrl,
        });
    }

    for (const champ of champions) {
        await prisma.champion.create({ data: champ });
    }

    console.log(`Seeded ${champions.length} champions`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

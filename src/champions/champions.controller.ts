import { Controller, Get, Post, Body } from '@nestjs/common';
import { ChampionsService } from './champions.service';
import { AdoptChampionDto } from './dto/adopt-champion.dto';

@Controller('champions')
export class ChampionsController {
    constructor(private readonly championsService: ChampionsService) {}

    @Get()
    findAll() {
        return this.championsService.findAll();
    }

    @Post('adopt')
    adoptChampion(@Body() dto: AdoptChampionDto) {
        return this.championsService.adoptChampion(dto);
    }
}



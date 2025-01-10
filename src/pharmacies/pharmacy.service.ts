import { Injectable } from '@nestjs/common';
import { PharmacyRepository } from '../repositories/pharmacy.repository';
import { PharmacyInterface } from '../interfaces/pharmacy.interface';
import { CreatePharmacyDto } from './dto/create-pharmacy.dto';
import { UpdatePharmacyDto } from './dto/update-pharmacy.dto';

@Injectable()
export class PharmacyService {
    constructor(private readonly pharmacyRepository: PharmacyRepository) { }

    async createPharmacy(pharmacy: CreatePharmacyDto): Promise<string> {
        return this.pharmacyRepository.create(pharmacy);
    }

    async getAllPharmacies(): Promise<PharmacyInterface[]> {
        return this.pharmacyRepository.findAll();
    }

    async getPharmacyById(id: string): Promise<PharmacyInterface | null> {
        return this.pharmacyRepository.findById(id);
    }

    async updatePharmacy(
        id: string,
        pharmacy: UpdatePharmacyDto,
    ): Promise<PharmacyInterface> {
        await this.pharmacyRepository.update(id, pharmacy);
        return this.pharmacyRepository.findById(id);
    }

    async deletePharmacy(id: string): Promise<void> {
        return this.pharmacyRepository.delete(id);
    }
} 
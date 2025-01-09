import { Injectable } from '@nestjs/common';
import { PharmacyRepository } from '../repositories/pharmacy.repository';
import { PharmacyInterface } from '../interfaces/pharmacy.interface';

@Injectable()
export class PharmacyService {
    constructor(private readonly pharmacyRepository: PharmacyRepository) { }

    async createPharmacy(pharmacy: PharmacyInterface): Promise<string> {
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
        pharmacy: Partial<PharmacyInterface>,
    ): Promise<void> {
        return this.pharmacyRepository.update(id, pharmacy);
    }

    async deletePharmacy(id: string): Promise<void> {
        return this.pharmacyRepository.delete(id);
    }
} 
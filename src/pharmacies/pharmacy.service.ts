import { Injectable } from '@nestjs/common';
import { PharmacyRepository } from '../repositories/pharmacy.repository';
import { PharmacyInterface } from '../interfaces/pharmacy.interface';
import { CreatePharmacyDto } from './dto/create-pharmacy.dto';
import { UpdatePharmacyDto } from './dto/update-pharmacy.dto';


function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const R = 6371; 
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLng = (lng2 - lng1) * (Math.PI / 180);
  
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; 
  }
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

    async getNearbyGuardPharmacies(lat: number, lng: number): Promise<PharmacyInterface[]> {
        const radiusInKm = 10; 
    
        const pharmacies = await this.pharmacyRepository.findAll();
        
        const filteredAndSortedPharmacies = pharmacies
          .filter((pharmacy) => pharmacy.is_guard) 
          .map((pharmacy) => ({
            ...pharmacy,
            distance: calculateDistance(lat, lng, pharmacy.location.lat, pharmacy.location.lng),
          }))
          .filter((pharmacy) => pharmacy.distance <= radiusInKm) 
          .sort((a, b) => a.distance - b.distance); 
    
        return filteredAndSortedPharmacies;
      }
} 
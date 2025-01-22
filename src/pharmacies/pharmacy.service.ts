import { Injectable, NotFoundException } from '@nestjs/common';
import { PharmacyRepository } from '../repositories/pharmacy.repository';
import { PharmacyInterface } from '../interfaces/pharmacy.interface';
import { CreatePharmacyDto } from './dto/create-pharmacy.dto';
import { UpdatePharmacyDto } from './dto/update-pharmacy.dto';


function calculateDistance(lat1, lon1, lat2, lon2): number {
  const R = 6371; 
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; 
  return distance;
} 

@Injectable()
export class PharmacyService {
    constructor(private readonly pharmacyRepository: PharmacyRepository) { }

    async createPharmacy(pharmacy: CreatePharmacyDto): Promise<string> {
        const plainPharmacy = {
            ...pharmacy,
            location: {
                lat: pharmacy.location.lat,
                lng: pharmacy.location.lng
            },
            openingHours: {
                open_at: pharmacy.openingHours.open_at,
                close_at: pharmacy.openingHours.close_at
            }
        };
        return this.pharmacyRepository.create(plainPharmacy);
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
    async getNearbyGuardPharmacies(latitude: number, longitude: number): Promise<PharmacyInterface[]> {
      const pharmacies = await this.pharmacyRepository.findAll();
  
      // Filter pharmacies by distance
      const nearbyPharmacies = pharmacies.filter((pharmacy) => {
        const distance = calculateDistance(
          latitude,
          longitude,
          pharmacy.location.lat,
          pharmacy.location.lng
        );
        return distance <= 10; 
      });
  
      return nearbyPharmacies;
    }
} 
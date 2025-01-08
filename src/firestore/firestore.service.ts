import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import serviceAccount from '../config/firestore/secret.json';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FirestoreService {
  private db: admin.firestore.Firestore;

  constructor(private configService: ConfigService) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
      databaseURL: this.configService.get<string>('FIRESTORE_DATABASE_URL'),
    });
    this.db = admin.firestore();
  }

  async addDocument(collection: string, data: any): Promise<string> {
    const docRef = await this.db.collection(collection).add(data);
    return docRef.id;
  }

  async getDocument(collection: string, id: string): Promise<any> {
    const doc = await this.db.collection(collection).doc(id).get();
    return doc.exists ? doc.data() : null;
  }

  async getAllDocuments(collection: string): Promise<any[]> {
    const snapshot = await this.db.collection(collection).get();
    return snapshot.docs.map((doc) => doc.data());
  }
}

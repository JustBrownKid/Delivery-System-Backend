import { OswmCreation ,Oswm } from '../entities/oswm.entity';

export interface IOswmRepository {
  getByTrackingId(trackingId: number): Promise<Oswm | null>;
  create(data: OswmCreation ): Promise<void>;
  createMultiple(data: OswmCreation[]): Promise<void>;
  getByDateRange(start: Date, end: Date): Promise<Oswm[]>;

}
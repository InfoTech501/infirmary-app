import { Guardian } from '../guardian/GuardianInterface';
import { MedicalHistory } from '../medical/history/MedicalHistoryInterface';
import { Person } from '../person/PersonInterface';
import { Section } from '../section/SectionInterface';
import { User } from '../user/UserInterface';

export interface Student {
    id: number;
    lrn: number;
    person: Person;
    section: Section;
    user: User;
    guardian: Guardian;
    medicalHistory: MedicalHistory;
}

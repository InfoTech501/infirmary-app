import { Condition } from "@/types/condition/ConditionInterface";
import { Student } from "@/types/student/StudentInterface";

export interface MedicalHistory {
  medHistoryId: number;
  lastCheckupDate: Date;
  student: Student;
  condition: Condition;
}

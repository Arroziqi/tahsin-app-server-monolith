import {
  ClassType,
  Education,
  Enrollment,
  Program,
  TimeOfStudy,
} from '@prisma/client';

export type EnrollmentResponse = {
  id: number;
  email: string;
  fullName: string;
  motivation: string;
  dateOfBirth: Date;
  noTelp: string;
  lastEducation: Education;
  program: Program;
  classType: ClassType;
  timeOfStudy: TimeOfStudy;
  voiceRecording?: string;
  dateOfReservation?: Date;
  academicPeriodId: number;
  userId?: number;
  classId?: number | null;
  createdBy: number | null;
};

export type CreateEnrollmentRequest = {
  username: string;
  email: string;
  fullName: string;
  motivation: string;
  dateOfBirth: Date;
  noTelp: string;
  lastEducation: Education;
  program: Program;
  classType: ClassType;
  timeOfStudy: TimeOfStudy;
  voiceRecording?: string;
  dateOfReservation?: Date;
  academicPeriodId: number;
  userId?: number;
  studentId?: number; // only for detecting is the student already registered or not
  classId?: number | null;
};

export type RegisterEnrollmentRequest = {
  username: string;
  email: string;
  fullName: string;
  motivation: string;
  dateOfBirth: Date;
  noTelp: string;
  lastEducation: Education;
  program: Program;
  classType: ClassType;
  timeOfStudy: TimeOfStudy;
  voiceRecording?: string;
  dateOfReservation?: Date;
  academicPeriodId: number;
  userId: number;
  classId?: number | null;
};

export type UpdateEnrollmentRequest = {
  id: number;
  username: string;
  email: string;
  fullName: string;
  motivation: string;
  dateOfBirth: Date;
  noTelp: string;
  lastEducation: Education;
  program: Program;
  classType: ClassType;
  timeOfStudy: TimeOfStudy;
  voiceRecording?: string;
  dateOfReservation?: Date;
  academicPeriodId: number;
  userId?: number;
  classId?: number | null;
};

export function toEnrollmentResponse(
  enrollment: Enrollment,
): EnrollmentResponse {
  return {
    id: enrollment.id,
    academicPeriodId: enrollment.academicPeriodId,
    userId: enrollment.userId,
    classId: enrollment.classId,
    createdBy: enrollment.createdBy,
    fullName: enrollment.fullName,
    dateOfBirth: enrollment.dateOfBirth,
    noTelp: enrollment.noTelp,
    email: enrollment.email,
    lastEducation: enrollment.lastEducation,
    program: enrollment.program,
    classType: enrollment.classType,
    timeOfStudy: enrollment.timeOfStudy,
    motivation: enrollment.motivation,
    voiceRecording: enrollment.voiceRecording ?? undefined,
    dateOfReservation: enrollment.dateOfReservation ?? undefined,
  };
}

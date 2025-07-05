import {
  ClassType,
  Education,
  Enrollment,
  Program,
  TimeOfStudy,
} from '@prisma/client';

export type EnrollmentResponse = {
  id: number;
  fullName: string;
  dateOfBirth: Date;
  noTelp: string;
  email: string;
  lastEducation: Education;
  program: Program;
  classType: ClassType;
  timeOfStudy: TimeOfStudy;
  motivation: string;
  voiceRecording?: string;
  dateOfReservation?: Date;
  userId: number;
  classId: number;
  createdBy: number | null;
};

export type CreateEnrollmentRequest = {
  fullName: string;
  dateOfBirth: Date;
  noTelp: string;
  email: string;
  lastEducation: Education;
  program: Program;
  classType: ClassType;
  timeOfStudy: TimeOfStudy;
  motivation: string;
  voiceRecording?: string;
  dateOfReservation?: Date;
  userId: number;
  classId: number;
};

export type UpdateEnrollmentRequest = {
  id: number;
  fullName?: string;
  dateOfBirth?: Date;
  noTelp?: string;
  email?: string;
  lastEducation?: Education;
  program?: Program;
  classType?: ClassType;
  timeOfStudy?: TimeOfStudy;
  motivation?: string;
  voiceRecording?: string;
  dateOfReservation?: Date;
  userId?: number;
  classId?: number;
};

export function toEnrollmentResponse(
  enrollment: Enrollment,
): EnrollmentResponse {
  return {
    id: enrollment.id,
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

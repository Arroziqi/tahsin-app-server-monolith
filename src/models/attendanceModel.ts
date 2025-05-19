import { Attendance, AttendanceStatus } from '@prisma/client';

export type AttendanceResponse = {
  id: number;
  attendance: AttendanceStatus;
  studentId: number;
  scheduleId: number;
  createdBy: number | null;
};

export type CreateAttendanceRequest = {
  attendance: AttendanceStatus;
  studentId: number;
  scheduleId: number;
};

export type UpdateAttendanceRequest = {
  id: number;
  attendance: AttendanceStatus;
  studentId: number;
  scheduleId: number;
};

export function toAttendanceResponse(
  attendance: Attendance,
): AttendanceResponse {
  return {
    id: attendance.id,
    attendance: attendance.attendance,
    studentId: attendance.studentId,
    scheduleId: attendance.scheduleId,
    createdBy: attendance.createdBy,
  };
}

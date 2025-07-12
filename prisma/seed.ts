import {
  AttendanceStatus,
  ClassType,
  Education,
  PrismaClient,
  Program,
  Role,
  TimeOfStudy,
} from '@prisma/client';
import { hashPassword } from '../src/common/provider/hash';

const prisma = new PrismaClient();

async function main() {
  const now = new Date();
  const password = await hashPassword('pass1234');

  // Users
  const superAdmin = await prisma.user.create({
    data: {
      username: 'superadmin',
      email: 'superadmin@example.com',
      password: password,
      role: Role.ADMIN,
      createdAt: now,
      updatedAt: now,
      updatedBy: 1,
    },
  });

  const adminUser = await prisma.user.create({
    data: {
      username: 'admin1',
      email: 'admin@example.com',
      password: password,
      role: Role.ADMIN,
      createdAt: now,
      updatedAt: now,
      updatedBy: superAdmin.id,
    },
  });

  const teacherUser = await prisma.user.create({
    data: {
      username: 'teacher1',
      email: 'teacher@example.com',
      password: password,
      createdAt: now,
      updatedAt: now,
      updatedBy: superAdmin.id,
    },
  });

  const studentUser = await prisma.user.create({
    data: {
      username: 'student1',
      email: 'student@example.com',
      password: password,
      createdAt: now,
      updatedAt: now,
      updatedBy: superAdmin.id,
    },
  });

  // Admin
  await prisma.admin.createMany({
    data: [
      {
        noAdmin: '1001',
        name: 'Admin Utama',
        userId: adminUser.id,
        createdAt: now,
        updatedAt: now,
        updatedBy: superAdmin.id,
      },
      {
        noAdmin: '1002',
        name: 'Super Admin',
        userId: superAdmin.id,
        createdAt: now,
        updatedAt: now,
        updatedBy: superAdmin.id,
      },
    ],
  });

  // Teacher
  const teacher = await prisma.teacher.create({
    data: {
      name: 'Ustadz Haris',
      nip: '987654321',
      noTelp: '987654321',
      accountNumber: '1234567890',
      accountName: 'Ust Haris',
      bankName: 'Bank Syariah',
      userId: teacherUser.id,
      createdAt: now,
      updatedAt: now,
      updatedBy: superAdmin.id,
    },
  });

  // Level
  const [levelDasar] = await prisma.$transaction([
    prisma.level.create({
      data: {
        level: 'Dasar',
        createdAt: now,
        updatedAt: now,
        updatedBy: superAdmin.id,
      },
    }),
    prisma.level.create({
      data: {
        level: 'Menengah',
        createdAt: now,
        updatedAt: now,
        updatedBy: superAdmin.id,
      },
    }),
    prisma.level.create({
      data: {
        level: 'Lanjutan',
        createdAt: now,
        updatedAt: now,
        updatedBy: superAdmin.id,
      },
    }),
  ]);

  // Student Status
  const studentStatus = await prisma.studentStatus.create({
    data: {
      status: 'Aktif',
      createdAt: now,
      updatedAt: now,
      updatedBy: superAdmin.id,
    },
  });

  // Batch
  const batch = await prisma.batch.create({
    data: {
      batch: 'Batch 1',
      year: 2025,
      createdAt: now,
      updatedAt: now,
      updatedBy: superAdmin.id,
    },
  });

  // Class Price
  const classPrice = await prisma.classPrice.create({
    data: {
      price: 300000,
      createdAt: now,
      updatedAt: now,
      updatedBy: superAdmin.id,
    },
  });

  // Class
  const kelas = await prisma.class.create({
    data: {
      class: 'Tahsin A',
      classPriceId: classPrice.id,
      batchId: batch.id,
      createdAt: now,
      updatedAt: now,
      updatedBy: superAdmin.id,
    },
  });

  // Enrollment
  const enrollment = await prisma.enrollment.create({
    data: {
      fullName: 'Student Fullname',
      dateOfBirth: new Date(),
      noTelp: '089898989',
      email: 'asas@gmail.com',
      lastEducation: Education.SMA,
      program: Program.DASAR,
      classType: ClassType.ONLINE,
      timeOfStudy: TimeOfStudy.MORNING,
      motivation: 'belajar',
      voiceRecording: 'voice',
      userId: studentUser.id,
      classId: kelas.id,
      createdAt: now,
      updatedAt: now,
      updatedBy: superAdmin.id,
    },
  });

  // Student
  const student = await prisma.student.create({
    data: {
      fullName: 'Ahmad Fauzi',
      motivation: 'Ingin memperbaiki bacaan Al-Quran',
      userId: studentUser.id,
      levelId: levelDasar.id,
      classId: kelas.id,
      enrollmentId: enrollment.id,
      studentStatusId: studentStatus.id,
      createdAt: now,
      updatedAt: now,
      updatedBy: superAdmin.id,
    },
  });

  // Day & Time
  const day = await prisma.day.create({
    data: {
      day: 'Senin',
      createdAt: now,
      updatedAt: now,
      updatedBy: superAdmin.id,
    },
  });

  const time = await prisma.time.create({
    data: {
      session: 'Pagi',
      startTime: 540,
      endTime: 660,
      createdAt: now,
      updatedAt: now,
      updatedBy: superAdmin.id,
    },
  });

  // Schedule
  const schedule = await prisma.schedule.create({
    data: {
      classId: kelas.id,
      teacherId: teacher.id,
      dayId: day.id,
      timeId: time.id,
      createdAt: now,
      updatedAt: now,
      updatedBy: superAdmin.id,
    },
  });

  // Module
  const module = await prisma.module.create({
    data: {
      classId: kelas.id,
      module: 'Tajwid Dasar',
      createdAt: now,
      updatedAt: now,
      updatedBy: superAdmin.id,
    },
  });

  // Component
  await prisma.component.create({
    data: {
      moduleId: module.id,
      component: 'Mad Thobi’i',
      createdAt: now,
      updatedAt: now,
      updatedBy: superAdmin.id,
    },
  });

  // Task
  const task = await prisma.task.create({
    data: {
      moduleId: module.id,
      teacherId: teacher.id,
      task: 'Latihan panjang pendek',
      createdAt: now,
      updatedAt: now,
      updatedBy: superAdmin.id,
    },
  });

  // Score
  await prisma.score.create({
    data: {
      value: 100,
      studentId: student.id,
      taskId: task.id,
      createdAt: now,
      updatedAt: now,
      updatedBy: superAdmin.id,
    },
  });

  // Attendance;
  await prisma.attendance.create({
    data: {
      attendance: AttendanceStatus.ABSENT,
      studentId: student.id,
      scheduleId: schedule.id,
      createdAt: now,
      updatedAt: now,
      updatedBy: superAdmin.id,
    },
  });

  // Bill
  const bill = await prisma.bill.create({
    data: {
      studentId: student.id,
      bill: 300000,
      remainBill: 50000,
      description: 'Biaya Bulan Mei',
      createdAt: now,
      updatedAt: now,
      updatedBy: superAdmin.id,
    },
  });

  // Bank Account
  const bankAccount = await prisma.bankAccount.create({
    data: {
      accountName: 'Yayasan Quran',
      accountNumber: '9876543210',
      bankName: 'Bank Muamalat',
      createdAt: now,
      updatedAt: now,
      updatedBy: superAdmin.id,
    },
  });

  // Transaction Type & Status
  const transfer = await prisma.transactionType.create({
    data: {
      type: 'Transfer',
      createdAt: now,
      updatedAt: now,
      updatedBy: superAdmin.id,
    },
  });

  const paid = await prisma.transactionStatus.create({
    data: {
      status: 'Paid',
      createdAt: now,
      updatedAt: now,
      updatedBy: superAdmin.id,
    },
  });

  // Transaction
  await prisma.transaction.create({
    data: {
      bankAccountId: bankAccount.id,
      billId: bill.id,
      transactionTypeId: transfer.id,
      transactionStatusId: paid.id,
      createdAt: now,
      updatedAt: now,
      updatedBy: superAdmin.id,
    },
  });

  console.log('✅ Seeder selesai (TS) dengan semua entitas.');
}

main()
  .catch((e) => {
    console.error('❌ Error saat seeding:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

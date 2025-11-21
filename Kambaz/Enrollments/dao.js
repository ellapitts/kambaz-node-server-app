// When a course is created, it needs to be associated with the creator. In a new Enrollments/dao.js file, implement enrollUserInCourse to enroll, or associate, a user to a course.

import { v4 as uuidv4 } from "uuid";
export default function EnrollmentsDao(db) {

  function enrollUserInCourse(userId, courseId) {
    const { enrollments } = db;
    enrollments.push({ _id: uuidv4(), user: userId, course: courseId });
  }

    function unenrollUserFromCourse(userId, courseId) {
    const { enrollments } = db;
    const index = enrollments.findIndex(
      (enrollment) => enrollment.user === userId && enrollment.course === courseId
    );
    if (index !== -1) {
      enrollments.splice(index, 1);
    }
  }

  function findEnrollmentsForUser(userId) {
    const { enrollments } = db;
    return enrollments.filter((enrollment) => enrollment.user === userId);
  }

  return { enrollUserInCourse, unenrollUserFromCourse, findEnrollmentsForUser };

}

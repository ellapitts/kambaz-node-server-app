// When a course is created, it needs to be associated with the creator. In a new Enrollments/dao.js file, implement enrollUserInCourse to enroll, or associate, a user to a course.

import { v4 as uuidv4 } from "uuid";
export default function EnrollmentsDao(db) {

  function enrollUserInCourse(userId, courseId) {
    const { enrollments } = db;
    enrollments.push({ _id: uuidv4(), user: userId, course: courseId });
  }

  return { enrollUserInCourse };

}

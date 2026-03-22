import { CourseType } from '@/store/courses-store';
import { GradeScale } from '@/store/user-store';

export const getGrade = (score: number, scale: GradeScale = '4.0') => {
  if (scale === '5.0') {
    if (score <= 100 && score >= 70) {
      return 'A';
    } else if (score <= 69 && score >= 60) {
      return 'B';
    } else if (score <= 59 && score >= 50) {
      return 'C';
    } else if (score <= 49 && score >= 45) {
      return 'D';
    } else if (score <= 44 && score >= 40) {
      return 'E';
    } else {
      return 'F';
    }
  }

  // 4.0 scale
  if (score <= 100 && score >= 70) {
    return 'A';
  } else if (score <= 69 && score >= 60) {
    return 'B';
  } else if (score <= 59 && score >= 50) {
    return 'C';
  } else if (score <= 49 && score >= 45) {
    return 'D';
  } else {
    return 'F';
  }
};

const gradePoint = (score: number, scale: GradeScale = '4.0') => {
  if (scale === '5.0') {
    if (score <= 100 && score >= 70) {
      return 5;
    } else if (score <= 69 && score >= 60) {
      return 4;
    } else if (score <= 59 && score >= 50) {
      return 3;
    } else if (score <= 49 && score >= 45) {
      return 2;
    } else if (score <= 44 && score >= 40) {
      return 1;
    } else {
      return 0;
    }
  }

  // 4.0 scale
  if (score <= 100 && score >= 70) {
    return 4;
  } else if (score <= 69 && score >= 60) {
    return 3;
  } else if (score <= 59 && score >= 50) {
    return 2;
  } else if (score <= 49 && score >= 45) {
    return 1;
  } else {
    return 0;
  }
};

export interface CourseDetails {
  id: string;
  course_code: string;
  course_title: string;
  course_units: string;
  level_id_fk: string;
  result: string;
}

export function calculateCGPA(results: CourseType[], scale: GradeScale = '4.0'): number[] {
  const passThreshold = scale === '5.0' ? 40 : 45;

  let totalUnits = 0;
  let totalUnitPassed = 0;

  const totalGradePoint = results.reduce((result, course) => {
    const courseUnitPoint = course.course_units;

    totalUnits += courseUnitPoint;
    totalUnitPassed += course.result >= passThreshold ? courseUnitPoint : 0;

    const coursePoint = gradePoint(course.result, scale);

    const courseGradePoint = courseUnitPoint * coursePoint;
    return result + courseGradePoint;
  }, 0);

  const scoreGP = totalGradePoint / totalUnits;

  const cgpa = Math.round((scoreGP + Number.EPSILON) * 100) / 100;

  return [totalUnits, totalUnitPassed, totalGradePoint, cgpa];
}

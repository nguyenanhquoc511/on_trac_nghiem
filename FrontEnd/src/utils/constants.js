const localhost = 'http://localhost:3000/';

export const reading_tests_url = `${localhost}api/tests/show?category=63329f38623618c13355482f`;

export const listening_tests_url = `${localhost}api/tests/show?category=63329f65623618c133554833`;

export const details_test_url = `${localhost}api/tests/detail/`;

export const register_url = `${localhost}api/users/signup`;

export const login_url = `${localhost}api/users/signin`;

export const reading_exam_url = `${localhost}api/exams/show?category=63329f38623618c13355482f`;

export const listening_exam_url = `${localhost}api/exams/show?category=63329f65623618c133554833`;

export const update_password_url = `${localhost}api/users/infor`;

export const submit_test_url = `${localhost}api/exams/show/submit`;

// lấy ra tổng số lần thi trong 1 tháng theo lis , read
export const statistic_number_exam = `${localhost}api/users/infor/statisticsNumberExam`;

//lấy ra trung bình tổng số điểm trung bình trong tháng theo lis, read
export const statistic_score_exam = `${localhost}api/users/infor/statisticsScoreExam`;

export const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

import * as courseActions from '../store/course.actions';
import {CourseModal} from '../course.modal';
import {CourseOutlineModal} from '../course-outline/course-outline.modal';
import {BookModal} from '../course-outline/book.modal';
import {ExamTypeModal} from '../course-outline/exam-type.modal';
import {CourseMaterialModal} from '../course-material/course-material.modal';
import {SubmitAssignmentModal} from '../submit-assignment/submit-assignment.modal';
import {GradeBookModal} from '../grade-book/grade-book.modal';
import {GradeTypeModal} from '../grade-book/grade-type.modal';
import {LeaveStatusModal} from '../leave-status/leave-status.modal';
import {AbsentteeModal} from '../leave-status/absenttee.modal';
import {AskQuestionModal} from '../ask-question/ask-question.modal';
import {AnnouncementModal} from '../../home/announcement.modal';

export interface State {
  semesterCourses: CourseModal[];
  courseOutline: CourseOutlineModal;
  courseMaterial: CourseMaterialModal[];
  submitAssigments: SubmitAssignmentModal[];
  gradeBook: GradeBookModal;
  leaveStatus: LeaveStatusModal;
  askQuestion: AskQuestionModal;
  announcements: AnnouncementModal[];
}

const initialState: State = {
  semesterCourses: [],
  //   new CourseModal('object oriented'),
  //   new CourseModal('programming fundamental'),
  //   new CourseModal('numerical computing'),
  //   new CourseModal('artifical intelligance'),
  //   new CourseModal('natural processing language')
  // ],
  courseOutline: new CourseOutlineModal(
    '    This course will introduce the basics of discrete structures and\n' +
    '    theoretical computer science, its scope and applications. Topics\n' +
    '    such as predicate logic, proof techniques, induction, time complexity,\n' +
    '    counting techniques and combinatorics, basics of graph theory,\n' +
    '    elementary number theory and cryptography will be covered during the course.',
    [
      '        To introduce the principles of discrete mathematics and the basic\n' +
      '        foundations of theory of computer science',
      'To make students understand the use of predicate logic, proof techniques,\n' +
      '        time complexity, mathematical induction, recursive algorithms, counting\n' +
      '        techniques, combinatorics, graph theory, elementary number theory and\n' +
      '        cryptography.',
      'To equip students with critical thinking to solve problems in computer\n' +
      '        science.'
    ],
    [
      new BookModal('programming fundamentals', 'auther shelby', 3.3),
      new BookModal('object fundamentals', 'shelby', 2.3),
    ],
    [
      new ExamTypeModal('Quiz', 5),
      new ExamTypeModal('Assignments', 30),
      new ExamTypeModal('Mid-term', 10),
      new ExamTypeModal('Final-term', 35),
      new ExamTypeModal('Class-Activity', 15)
    ],
    [
      'Why Discrete Mathematics for Computer Scientists?\n' +
      '          Predicate Logic and Rules and inferences',
      'Basic Proofs Technique\n' +
      '          Direct Proofs, Contraposition, Contradiction',
      'Basic logic reasoning tools including Propositions, Connectives(AND,\n' +
      '          XOR, OR), Implications, Equivalences, Propositional functions,\n' +
      '          Quantifiers',
      'Direct Proofs, Contraposition, Contradiction',
      'Mathematical Induction\n' +
      '          Induction Principle and its proof from Piano’s Axiom.\n' +
      '          Weak Induction',
      'Mathematical Induction\n' +
      '          Induction Principle and its proof from Piano’s Axiom.\n' +
      '          Weak Induction',
      'Strong Induction (False inductive proofs) and Well Ordering',
      'Time Complexity',
      'Recursion',
      'Recursion',
      'Basics of Counting - combinatorics',
      'Winding up - revision'
    ],
  ),
  courseMaterial: [
    // new CourseMaterialModal('Discrete Mathematics-Outlines-Lectures.docx'),
    // new CourseMaterialModal('Assignment-01-Propositional Logic.pdf'),
    // new CourseMaterialModal('Lec02-03-F19-Propositional-Logic.pdf'),
    // new CourseMaterialModal('Lec04-05-F19-Propositional-Logic-Quantifiers.pdf'),
    // new CourseMaterialModal('Practice-Problems-01A.pdf'),
    // new CourseMaterialModal('Assignment-02-F19-Quantifiers.pdf'),
    // new CourseMaterialModal('Lec24-25-F19-PHP.pptx'),
    // new CourseMaterialModal('Lec-26-29-F19-Couting-Last-Week.pptx'),
    // new CourseMaterialModal('Assignment-03-F19-Proofs-A.pdf')
  ],
  submitAssigments: [
    // new SubmitAssignmentModal('Assignment No 1', '12/2/20', ''),
    // new SubmitAssignmentModal('Assignment No 2', '12/3/20', ''),
    // new SubmitAssignmentModal('Assignment No 3', '22/4/20', ''),
    // new SubmitAssignmentModal('Assignment No 4', '02/6/20', ''),
    // new SubmitAssignmentModal('Assignment No 5', '22/7/20', '')
  ],
  gradeBook: new GradeBookModal([], [], [], [], []),
  //   [
  //     new GradeTypeModal('assigmnent 01', 50, 46),
  //     new GradeTypeModal('assigmnent 02', 50, 41),
  //     new GradeTypeModal('assigmnent 03', 50, 45),
  //     new GradeTypeModal('assigmnent 04', 50, 48)
  //   ],
  //   [
  //     new GradeTypeModal('quiz 01', 50, 46),
  //     new GradeTypeModal('quiz 02', 50, 41),
  //     new GradeTypeModal('quiz 03', 50, 43)
  //   ],
  //   [
  //     new GradeTypeModal('mid term 01', 50, 46)
  //   ],
  //   [
  //     new GradeTypeModal('final term 01', 50, 46)
  //   ],
  //   [
  //     new GradeTypeModal('project 01', 50, 41),
  //     new GradeTypeModal('presentation 02', 50, 30)
  //   ]
  // ),
  leaveStatus: new LeaveStatusModal('', '', []),
  // leaveStatus: new LeaveStatusModal(25, 3, [
  //   new AbsentteeModal(1, '02/02/20'),
  //   new AbsentteeModal(2, '12/03/20'),
  //   new AbsentteeModal(1, '22/08/20'),
  //   new AbsentteeModal(3, '23/12/20'),
  //   new AbsentteeModal(1, '30/02/20')
  // ]),
  askQuestion: null,
  announcements: [
    new AnnouncementModal('Heading 1', 'this is the aavounrafsdds',
      '8-2-2020 to 7-3-2020'),
    new AnnouncementModal('Heading 1', 'this is the aavounrafsdds',
      '8-2-2020 to 7-3-2020'),
    new AnnouncementModal('Heading 1', 'this is the aavounrafsdds',
      '8-2-2020 to 7-3-2020'),
    new AnnouncementModal('Heading 1', 'this is the aavounrafsdds',
      '8-2-2020 to 7-3-2020'),
    new AnnouncementModal('Heading 1', 'this is the aavounrafsdds',
      '8-2-2020 to 7-3-2020'),
    new AnnouncementModal('Heading 1', 'this is the aavounrafsdds',
      '8-2-2020 to 7-3-2020')
  ]
};

export function courseReducer(
  state = initialState,
  action: courseActions.CourseActions
) {
  switch (action.type) {
    case 'SET_ALLOCATED_COURSES': {
      return {
        ...state,
        semesterCourses: action.payload
      };
    }
    case 'SET_COURSE_OUTLINE': {
      return {
        ...state,
        courseOutline: action.payload
      };
    }
    case 'SET_COURSE_MATERIAL': {
      return {
        ...state,
        courseMaterial: action.payload
      };
    }
    case 'SET_SUBMIT_ASSIGNMENT': {
      return {
        ...state,
        submitAssigments: action.payload
      };
    }
    case 'SET_GRADE_BOOK': {
      return {
        ...state,
        gradeBook: action.payload
      };
    }
    case 'SET_ATTENDANCE': {
      return {
        ...state,
        leaveStatus: action.payload
      };
    }
    case 'ASK_QUESTION': {
      return {
        ...state,
        askQuestion: action.payload
      };
    }
    case courseActions.SET_ANNOUNCEMENTS: {
      return {
        ...state,
        announcements: action.payload
      };
    }
    default:
      return state;
  }
}

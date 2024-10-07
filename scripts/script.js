// The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
  };
  
  // The provided assignment group.
  const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
      {
        id: 1,
        name: "Declare a Variable",
        due_at: "2023-01-25",
        points_possible: 50
      },
      {
        id: 2,
        name: "Write a Function",
        due_at: "2023-02-27",
        points_possible: 150
      },
      {
        id: 3,
        name: "Code the World",
        due_at: "3156-11-15",
        points_possible: 500
      }
    ]
  };
  
  // The provided learner submission data.
  const LearnerSubmissions = [
    {
      learner_id: 125,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-25",
        score: 47
      }
    },
    {
      learner_id: 125,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-02-12",
        score: 150
      }
    },
    {
      learner_id: 125,
      assignment_id: 3,
      submission: {
        submitted_at: "2023-01-25",
        score: 400
      }
    },
    {
      learner_id: 132,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-24",
        score: 39
      }
    },
    {
      learner_id: 132,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-03-07",
        score: 140
      }
    }
  ];
// Make due date checker (rewatch)
function isAssignmentNotDue(assignment) {
  return new Date(assignment.due_at).getTime() > new Date().getTime()
}
// Make data collecting function using objects and error checks 
  function getLearnerData(course, ag, submissions) {
    if (course.id !== ag.course_id) {
      throw "Invalid Course ID"
    }
    
    const assignmentObj = {};
// loop assignment submissions and create object of it for later
    for (let i=0; i < ag.assignments.length; i++) {
      assignmentObj[ag.assignments[i].id] = ag.assignments[i]
    }
// create catch all tracker for all students and their submissions
    const submissionTracker = {};
// loop through every submission, organize them, account for late deductions and error check point values
    submissions.forEach(submission => {
      const assignment = assignmentObj[submission.assignment_id]
      const isNotDue = isAssignmentNotDue(assignment)
      if(isNotDue === true) {
        return
      }
      if (assignment.points_possible <= 0 ||
        typeof assignment.points_possible !== "number" ||
        typeof submission.submission.score !== "number"
      ) {
        throw "invalid"
    }

    const isLate = submission.submission.submitted_at > assignment.due_at
    const lateDeduction = assignment.points_possible * 0.1

    const score = isLate ? submission.submission.score - lateDeduction : submission.submission.score
// create array with final results and log
    if(submissionTracker[submission.learner_id]){
      submissionTracker[submission.learner_id].pointsEarned += score
      submissionTracker[submission.learner_id].totalPossible += assignment.points_possible
    } else {
      submissionTracker[submission.learner_id] = {
        id: submission.learner_id,
        pointsEarned : score,
        totalPossible: assignment.points_possible
      }
    }

    submissionTracker[submission.learner_id].avg = submissionTracker[submission.learner_id].pointsEarned / submissionTracker[submission.learner_id].totalPossible;

    submissionTracker[submission.learner_id][assignment.assignment_id] = score / assignment.points_possible;

    console.log(submissionTracker)
    })
    // here, we would process this data to achieve the desired result.
    //const result = [
      //{
        // student id
       // id: 125,
        // student score average
        //avg: 0.985, // (47 + 150) / (50 + 150)
        //score on each test in % format
        //1: 0.94, // 47 / 50
        //2: 1.0 // 150 / 150
      //},
      //{
       // id: 132,
       // avg: 0.82, // (39 + 125) / (50 + 150)
        //1: 0.78, // 39 / 50
        //2: 0.833 // late: (140 - 15) / 150
     // }
  }
  try{
  const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

  console.log(result);
  } catch(err) {
    console.log(err);
  }
function getAssignmentsAndQuizzes(course){
  const assignmentsRequestPageURL = course.url.replace("portal/site-reset", "direct/assignment/site") + ".json";
  const quizzesRequestURL = course.url.replace("portal/site-reset", "direct/sam_pub/context") + ".json";
  return Promise.all([fetch(assignmentsRequestPageURL), fetch(quizzesRequestURL)]);
}

function deadlineUnixTimeOfNearestAssignmentOrQuiz(assignmentsJSON, quizzesJSON){

  let nearestDeadline = Infinity;

  const assignments = assignmentsJSON["assignment_collection"];
  const quizzes = quizzesJSON["sam_pub_collection"];

  for(let assignmentNumber = 0; assignmentNumber < assignments.length; assignmentNumber++){

    const assignment = assignments[assignmentNumber];

    if(assignment["dueTime"] == undefined){
      continue;
    }

    const deadline = assignment["dueTime"]["epochSecond"];
    if(Date.now() / 1000 > deadline){ // overdue
      continue;
    } else if(isAssignmentAlreadySubmitted(assignment)){
      continue;
    } else if(deadline < nearestDeadline){
      nearestDeadline = deadline;
    }

  }

  for(let quizNumber = 0; quizNumber < quizzes.length; quizNumber++){

    const quiz = quizzes[quizNumber];

    if(quiz["dueTime"] == undefined){
      continue;
    }

    const deadline = quiz["dueDate"] / 1000;
    if(Date.now() / 1000 > deadline){ // overdue
      continue;
    } else if(isQuizAlreadySubmitted(quiz)){ // Note: This statement does not work; every quiz is evaluated to have been submitted
      continue;
    } else if(deadline < nearestDeadline){
      nearestDeadline = deadline;
    }

  }

  return nearestDeadline;

}

function isAssignmentAlreadySubmitted(assignment){
  const submissions = assignment["submissions"];
  if(submissions === null){
    return false;
  } else if(submissions[0]["dateSubmittedEpochSeconds"] === 0){
    return false;
  }
  return true;
}

function isQuizAlreadySubmitted(quiz){
  return true;
  /* TODO: get submission states of quizzes */
}

function getColorRGBByDeadline(deadline){

  const timeRemainingInSecond = deadline - Date.now() / 1000;
  const daysRemaining = timeRemainingInSecond / (60 * 60 * 24);

  const colors = [
    {threshold: 1, colorRGB: new ColorRGB(247, 137, 137)},
    {threshold: 5, colorRGB: new ColorRGB(253, 215, 131)},
    {threshold: 14, colorRGB: new ColorRGB(139, 212, 141)},
    {threshold: Infinity, colorRGB: new ColorRGB(173, 173, 173)}
  ]

  for(let colorIndex = 0; colorIndex < colors.length; colorIndex++){
    if(daysRemaining < colors[colorIndex]["threshold"]){
      return colors[colorIndex]["colorRGB"];
    }
  }

  return null;
    
}

function changeEntryColors(courseEntry, colorRGB){
  if(colorRGB === null){ // no assignments
    courseEntry.classList.add("course-entry-default-colors");
  } else {
    courseEntry.classList.add("course-entry-set-colors")
    courseEntry.style.background = colorRGB.getHTMLColorString();
    courseEntry.style.color = colorRGB.isLightColor() ? "#000000" : "#ffffff";
  }
}

function createCourseEntry(course, isSiteMenuCloseEventAddNeeded){
  
  const courseEntry = document.createElement("div");
  courseEntry.classList.add("entry", "course-entry");

  const courseTitle = document.createElement("span");
  courseTitle.classList.add("title", "course-title");
  courseTitle.textContent = course.title;
  promiseEntryColoring(course, courseEntry);

  const courseLink = document.createElement("a");
  courseLink.classList.add("link", "course-link");
  courseLink.setAttribute("href", course.url);

  const siteMenuShowButton = document.createElement("button");
  siteMenuShowButton.classList.add("menu-show-button");
  const siteMenuShowButtonIcon = document.createElement("div");
  siteMenuShowButtonIcon.classList.add("fa", "fa-chevron-down");
  siteMenuShowButton.append(siteMenuShowButtonIcon);

  courseEntry.append(courseTitle, courseLink, siteMenuShowButton);
  siteMenuShowButton.addEventListener("click", {course: course, courseEntry: courseEntry, handleEvent: updateSiteMenuDisplay});
  if(isSiteMenuCloseEventAddNeeded){
    document.addEventListener("click", {handleEvent: removeSiteMenuIfOutsideClicked});
  }

  return courseEntry;

}

/* assignmentのget処理がassignments.jsに書かれていないのはunconventionalであまりよくない */

function promiseEntryColoring(course, courseEntry){

  getAssignmentsAndQuizzes(course).then(async function(responses){
    const assignmentsJSON = await responses[0].json();
    const quizzesJSON = await responses[1].json();
    const deadline = deadlineUnixTimeOfNearestAssignmentOrQuiz(assignmentsJSON, quizzesJSON);
    const colorRGB = getColorRGBByDeadline(deadline);
    changeEntryColors(courseEntry, colorRGB); // colorRGB can be null if there is no assignment
  });

}

function addTimetable(){
  const courses = getCourses();
  document.getElementById("content").prepend(createTable(courses));
}

function createTable(courses){

  const timetableDetailsDiv = document.createElement("div");
  const timetableDetails = document.createElement("details");
  const detailsSummary = document.createElement("summary");
  const timetableDiv = document.createElement("div");
  const timetable = document.createElement("table");
  
  timetableDetailsDiv.classList.add("procyon-added", "table-details-div");
  timetableDetails.classList.add("procyon-added", "table-details");
  detailsSummary.classList.add("procyon-added", "table-details-summary");
  timetableDiv.classList.add("procyon-added", "timetable-div");
  timetable.classList.add("procyon-added", "timetable");

  /* for debugging */
  timetableDetailsDiv.id = "table-details-div";

  let isSiteMenuCloseEventAddNeeded = true;

  for(let period = 0; period <= 5; period++){
  
    const tr = document.createElement("tr");
    tr.classList.add("procyon-added");
  
    for(let day = 0; day <= 5; day++){
  
      if(period === 0 && day === 0){
        const th = document.createElement("th");
        th.textContent = "";
        th.classList.add("procyon-added", "header-corner", "cell");
        tr.appendChild(th);
      }
  
      if(period === 0 && day >= 1){
        const th = document.createElement("th");
        th.textContent = daysList[day];
        th.classList.add("procyon-added", "header-day", "cell");
        tr.appendChild(th);
      }
  
      if(period >= 1 && day === 0){
        const th = document.createElement("th");
        th.textContent = period;
        th.classList.add("procyon-added", "header-period", "cell");
        tr.appendChild(th);
      }
  
      if(period >= 1 && day >= 1){
  
        const td = document.createElement("td");
        td.id = daysList[day] + period;
        td.classList.add("procyon-added", "cell", "timetable-slot");

        if(courses[daysList[day]][period].length > 0){
          td.classList.add("nonempty-slot");
        } else {
          td.classList.add("empty-slot");
        }
  
        for(let courseNumber = 0; courseNumber < courses[daysList[day]][period].length; courseNumber++){
          const course = courses[daysList[day]][period][courseNumber];
          const courseEntry = createCourseEntry(course, isSiteMenuCloseEventAddNeeded);
          isSiteMenuCloseEventAddNeeded = false;
          td.append(courseEntry);
          if(courseNumber < courses[daysList[day]][period].length - 1){
            td.append(document.createElement("br"));
          }
        }
  
        tr.appendChild(td);
  
      }
  
    }
  
    timetable.appendChild(tr);
  
  }
  
  timetableDiv.append(timetable);
  timetableDetails.append(detailsSummary, timetableDiv);
  timetableDetailsDiv.appendChild(timetableDetails);

  return timetableDetailsDiv;

}

function getCourses(){
  
  const courses = {};
  
  for(let day = 1; day <= 5; day++){
    courses[daysList[day]] = [];
    for(let period = 1; period <= 5; period++){
      courses[daysList[day]][period] = [];
    }
  }

  /* code here */

  /* -------------------------------------------------- */

  const courseEntries = document.getElementsByClassName("fav-sites-entry");
  for(let entryNumber = 0; entryNumber < courseEntries.length; entryNumber++){
    const courseEntryLink = courseEntries[entryNumber].getElementsByClassName("fav-title")[0].children[0];
    const course = new Course();
    if(course.setDetailsFromFullTitle(courseEntryLink) === false){
      continue;
    }
    if(course.isCourseOfTheSemester(SemesterWithYear.getCurrentSemester())){
      courses[course.day][course.period].push(course);
    }
  }

  return courses;
  
}

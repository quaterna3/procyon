const daysList = ["日", "月", "火", "水", "木", "金", "土"]; // daysList[0] = "日" and daysList[6] = "土" should not be accessed

class SemesterWithYear{
  
  constructor(year = 0, semesterWithoutYear = 0){
    this.year = year;
    this.semesterWithoutYear = semesterWithoutYear;
  }

  static getCurrentSemester(){
    const today = new Date();
    const month = today.getMonth() + 1;
    const semesterWithoutYear = (4 <= month && month <= 9) ? 1 : 2;
    let year;
    if(4 <= month){
      year = today.getFullYear();
    } else {
      year = today.getFullYear() - 1;
    }
    const currentSemester = new SemesterWithYear(year, semesterWithoutYear);
    return currentSemester;
  }

  equals(semesterWithYear){
    return this.year === semesterWithYear.year && this.semesterWithoutYear === semesterWithYear.semesterWithoutYear;
  }

}

class Course{
  
  constructor(title = "", semesterWithYear = null, day = "", period = 0, url = ""){
    this.title = title;
    this.semesterWithYear = semesterWithYear;
    this.day = day;
    this.period = period;
    this.url = url;
  }

  setDetailsFromFullTitle(courseEntryLink){ // return if the course is valid

    const url = courseEntryLink.href;

    const courseFullTitle = courseEntryLink.children[0].innerHTML;
    let title, year, semesterWithoutYear, day, period;
    /* From courseFullTitle = "[2024前期月１]〇〇学基礎A" for example, extract the schedule information "2024前期月１" */
    const regex = /\[.*\]/;
    const match = courseFullTitle.match(regex);
    if(match == null){
      return false;
    }
    let scheduleDetails = match[0];

    title = courseFullTitle.replace(scheduleDetails, "");
    scheduleDetails = scheduleDetails.slice(1, -1); // remove '[' and ']'

    year = parseInt(scheduleDetails);
    scheduleDetails = scheduleDetails.replace(year + "", "");

    const semesterWithoutYearString = scheduleDetails.slice(0, 2);
    if(semesterWithoutYearString === "前期" || semesterWithoutYearString === "前前" || semesterWithoutYearString === "前後"){
      semesterWithoutYear = 1;
    } else if(semesterWithoutYearString === "後期" || semesterWithoutYearString === "後前" || semesterWithoutYearString === "後後"){
      semesterWithoutYear = 2;
    } else if(semesterWithoutYearString === "通年"){
      semesterWithoutYear = 3;
    }
    scheduleDetails = scheduleDetails.replace(semesterWithoutYearString, "");
    
    day = scheduleDetails.slice(0, 1);
    scheduleDetails = scheduleDetails.replace(day, "");

    switch(scheduleDetails){
      case "１":
        period = 1;
        break;
      case "２":
        period = 2;
        break;
      case "３":
        period = 3;
        break;
      case "４":
        period = 4;
        break;
      case "５":
        period = 5;
        break;
      default:
        return false;
    }

    const semesterWithYear = new SemesterWithYear(year, semesterWithoutYear);
    this.url = url;
    this.title = title;
    this.semesterWithYear = semesterWithYear;
    this.day = day;
    this.period = period;

    return true;

  }

  isCourseOfTheSemester(semesterWithYear){
    if(this.semesterWithYear.equals(semesterWithYear)){
      return true;
    } else if(this.semesterWithYear.year == semesterWithYear.year && this.semesterWithYear.semesterWithoutYear === 3){
      return true;
    } else {
      return false;
    }
  }

  getID(){
    return this.url.replace("https://panda.ecs.kyoto-u.ac.jp/portal/site-reset/", "");
  }

}

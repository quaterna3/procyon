function updateSiteMenuDisplay(e){

  const existingSiteMenu = document.getElementById("site-menu");
  let isNewSiteMenuShowNeeded = true;

  if(existingSiteMenu !== null){ /* */
    if(e.target.closest("." + "course-entry") === existingSiteMenu.closest("." + "course-entry")){
      isNewSiteMenuShowNeeded = false;
    }
    existingSiteMenu.remove();
  }

  if(isNewSiteMenuShowNeeded){
    showSiteMenu(this.course, this.courseEntry);
  }

}

function removeSiteMenuIfOutsideClicked(e){
  const existingSiteMenu = document.getElementById("site-menu");
  if(existingSiteMenu === null){ /* no menu list */
    return;
  }
  if(!existingSiteMenu.contains(e.target) && !isSiteMenuShowButton(e.target)){
    /* outside the existing menu list was clicked */
    existingSiteMenu.remove();
  }
}

function showSiteMenu(course, courseEntry){

  const requestPageURL = course.url.replace("portal/site-reset", "direct/site") + "/pages.json";
  
  fetch(requestPageURL).then(async function(response){
    const siteMenuJSON = await response.json();
    courseEntry.append(createSiteMenu(siteMenuJSON));
  });

}

function createSiteMenu(siteMenuJSON){

  const menu = document.createElement("ul");
  menu.id = "site-menu";

  for(let siteNumber = 0; siteNumber < siteMenuJSON.length; siteNumber++){

    const menuOptionEntryWrapper = document.createElement("li");

    const menuOptionEntry = document.createElement("div");
    menuOptionEntry.classList.add("entry", "site-menu-option-entry");
    const menuOptionLink = document.createElement("a");
    menuOptionLink.classList.add("link", "site-menu-option-link");
    menuOptionLink.setAttribute("href", siteMenuJSON[siteNumber].tools[0].url);
    const menuOptionIcon = document.createElement("span");
    menuOptionIcon.classList.add("site-menu-option-icon", "icon-sakai--" + siteMenuJSON[siteNumber].tools[0].toolId.replace(/\./g, "-"));
    const menuOptionTitle = document.createElement("span");
    menuOptionTitle.classList.add("title", "site-menu-option-title");
    menuOptionTitle.textContent = siteMenuJSON[siteNumber].title;
    menuOptionEntry.append(menuOptionIcon, menuOptionTitle, menuOptionLink);
    menuOptionEntryWrapper.append(menuOptionEntry);

    menu.append(menuOptionEntryWrapper);

  }

  return menu;

}

function isSiteMenuShowButton(element){
  return element.closest("." + "menu-show-button") !== null;
}

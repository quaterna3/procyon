function setScrollUnlocks(){
  
  const courseListPopupCloseButton = document.getElementById("otherSitesMenu").children[1].children[0];
  const courseListPopupShowButton = document.getElementById("viewAllSites").parentElement;

  courseListPopupCloseButton.id = "course-list-popup-close-button";
  courseListPopupCloseButton.addEventListener("click", unlockScroll);
  document.addEventListener("keydown", function(e){
    if(e.key == "Escape"){
      unlockScroll();
    }
  });
  courseListPopupShowButton.addEventListener("click", function(){
    const portalMask = document.getElementById("portalMask");
    if(portalMask !== null){
      portalMask.addEventListener("click", unlockScroll);
    }
  });

}

function unlockScroll(){
  document.body.classList.toggle("active-more-sites");
}

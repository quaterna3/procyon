/* Append ":not(.procyon-added)" to selectors with ":not( ... )", not to influence elements added by this extension */
function addExclusionOfCustomElementsToSelectors(){
  for(let sheetIndex = 0; sheetIndex < document.styleSheets.length; sheetIndex++){
    const sheet = document.styleSheets[sheetIndex];
    for(let ruleIndex = 0; ruleIndex < sheet.rules.length; ruleIndex++){
      const rule = sheet.rules[ruleIndex];
      if(rule.cssText.match(/:not\(.*?\)/g) !== null && !rule.cssText.includes(":not(.procyon-added)")){
        const newRuleCssText = rule.cssText.replace(/:not\((.*?)\)/g, ":not($1):not(.procyon-added)");
        sheet.deleteRule(ruleIndex);
        sheet.insertRule(newRuleCssText, sheet.rules.length);
      }
    }
  }
}

module.exports = { 
  tagMakeFor : function(parentName, tagName, Num){
  for(let i=0; i<Num ; i++){
    let element = document.createElement(tagName)
    parentName.appendChild(element)
      }
}
}
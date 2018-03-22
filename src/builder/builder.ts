export class Builder{
  constructor(){}

  blocks = [];

  block(accessor: string, controllerFactory: Function){
    let elements = document.querySelectorAll(accessor);

    elements.forEach(elem=>{
      let scope = controllerFactory(elem)
      this.assignEventListeners(elem, scope)
    })
  }

  private assignEventListeners(element: Element, scope){
    console.log(element)
    element.querySelectorAll('[bb-click]').forEach(elem=>{
      let functionName = elem.getAttribute('bb-click');
      console.log(elem);
      console.log(functionName);
      elem.addEventListener('click', scope[functionName]);
    })
  }
}
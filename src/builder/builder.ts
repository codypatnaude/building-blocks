import { Scope } from '../scope/scope';

export class Builder{
  constructor(){}

  $blocks = [];

  block(accessor: string, controllerFactory: Function){
    let elements = document.querySelectorAll(accessor);

    elements.forEach(elem=>{
      this.$blocks.push(new Scope(elem, controllerFactory));
    })
  }

  /*private assignEventListeners(element: Element, scope){
    //assign all id's to scope.$elements
    scope.$elements = {_root: element}
    element.querySelectorAll('[name]').forEach(elem=>{
      let fieldId = stringUtils.camelize(elem.getAttribute('name'));
      scope.$elements[fieldId] = elem;
    })

    //assign click events
    element.querySelectorAll('[bb-click]').forEach(elem=>{
      let functionName = elem.getAttribute('bb-click');
      elem.addEventListener('click', scope[functionName]);
    })
  }*/
}
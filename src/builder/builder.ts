import * as stringUtils from 'ember-cli-string-utils';

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
  }
}
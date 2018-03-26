import * as stringUtils from 'ember-cli-string-utils';

export class Scope{

  $root;
  $scope;

  constructor(elem: Element, factory: Function){
    this.$root = elem;
    this.$scope = factory(this.$root);
    this.createElementsArray()
      .assignEventListeners();
  }

  private createElementsArray(){
    this.$scope.$elements = {_root: this.$root}
    this.$root.querySelectorAll('[name]').forEach(elem=>{
      let fieldId = stringUtils.camelize(elem.getAttribute('name'));
      this.$scope.$elements[fieldId] = elem;
    })
    return this;
  }

  private assignEventListeners(){
    //assign click events
    this.$root.querySelectorAll('[bb-click]').forEach(elem=>{
      let functionName = elem.getAttribute('bb-click');


      //elem.addEventListener('click', this.$scope[functionName]);
      this.assignEvent('click', functionName, elem);
    })
    return this;
  }

  private assignEvent(event: string, script: string, elem: Element){
    elem.addEventListener('click', (event)=>this.evalInContext.call(this.$scope, script))
  }

  private evalInContext(script){
    eval(script);
  }


}
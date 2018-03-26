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

    const newEvent = (accessor, name) => {return {accessor: accessor, name: name} };
    let events = [];

    events.push(newEvent('bb-click', 'click'));
    events.push(newEvent('bb-dblclick', 'dblclick'));
    events.push(newEvent('bb-focus', 'focus'));
    events.push(newEvent('bb-blur', 'blur'));
    events.push(newEvent('bb-keydown', 'keydown'));
    events.push(newEvent('bb-keyup', 'keyup'));
    events.push(newEvent('bb-reset', 'reset'));
    events.push(newEvent('bb-submit', 'submit'));


    events.forEach(event=>{
      this.$root.querySelectorAll(`[${event.accessor}]`).forEach(elem=>{
        let script = elem.getAttribute(event.accessor);
        this.assignEvent(event.name, script, elem);
      })  
    })
    return this;
  }

  private assignEvent(eventName: string, script: string, elem: Element){
    elem.addEventListener(eventName, (event)=>this.evalInContext.call(this.$scope, script))
  }

  private evalInContext(script){
    let func  = new Function(script);
    func.apply(this);
  }


}
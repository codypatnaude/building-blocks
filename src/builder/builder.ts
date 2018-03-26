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
}
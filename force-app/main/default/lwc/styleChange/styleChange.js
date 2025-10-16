import { LightningElement } from 'lwc';

export default class StyleChange extends LightningElement {

    position = "left";
    fullWidth = true;
    hidden = true;

  get computedClassNames() {
    return [
      "div__block",
      this.position && `div_${this.position}`,
      {
        "div_full-width": this.fullWidth,
        hidden: this.hidden,
      },
    ];
  }
}
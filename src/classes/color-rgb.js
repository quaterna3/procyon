/* NO Error Handlings */

class ColorRGB{

  constructor(red = 0, green = 0, blue = 0){
    this.red = red;
    this.green = green;
    this.blue = blue;
  }

  getHTMLColorString(){
    return "#" + this.red.toString(16).padStart(2, "0") + this.green.toString(16).padStart(2, "0") + this.blue.toString(16).padStart(2, "0");
  }

  luminance(){

    const redNormalized = this.red / 255;
    const greenNormalized = this.green / 255;
    const blueNormalized = this.blue / 255;

    const redGammaCorrected = (redNormalized <= 0.03928) ? (redNormalized / 12.92) : Math.pow((redNormalized + 0.055) / 1.055, 2.4);
    const greenGammaCorrected = (greenNormalized <= 0.03928) ? (greenNormalized / 12.92) : Math.pow((greenNormalized + 0.055) / 1.055, 2.4);
    const blueGammaCorrected = (blueNormalized <= 0.03928) ? (blueNormalized / 12.92) : Math.pow((blueNormalized + 0.055) / 1.055, 2.4);

    return 0.2126 * redGammaCorrected + 0.7152 * greenGammaCorrected + 0.0722 * blueGammaCorrected;

  }

  isLightColor(){
    return this.luminance() > 0.5;
  }

}

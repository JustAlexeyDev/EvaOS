export default class FogotPassword {
  private fogotQuestion: string | null;

  constructor() {
    this.fogotQuestion = localStorage.getItem("fogotQuestion");
  }

  isForgotPasswordAvailable(): boolean {
    return this.fogotQuestion !== null && this.fogotQuestion !== "";
  }

  checkFogotPassword(fogotInput: string): boolean {
    return this.fogotQuestion === fogotInput;
  }
}
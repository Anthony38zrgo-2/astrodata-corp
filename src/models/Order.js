export class ContactRequest {
  constructor() {
    this.firstName = "";
    this.lastName = "";
    this.email = "";
  }

  get isValid() {
    return Boolean(
      this.firstName.trim() &&
      this.lastName.trim() &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email),
    );
  }
}

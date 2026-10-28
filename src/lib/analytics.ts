type Choice = "granted" | "denied";
let memoryChoice: Choice = "denied";
export function setConsent(choice: Choice) {
  memoryChoice = choice;
  try {
    localStorage.setItem("aimy-consent", choice);
    return true;
  } catch {
    return false;
  }
}
export function track(
  name:
    | "form_submit_success"
    | "form_mailto_open"
    | "phone_click"
    | "email_click"
    | "appointment_click",
) {
  let choice = memoryChoice;
  try {
    choice =
      localStorage.getItem("aimy-consent") === "granted" ? "granted" : "denied";
  } catch {}
  if (choice !== "granted") return;
  // Adaptateur de mesure à raccorder après validation du prestataire et de la confidentialité.
  window.dispatchEvent(new CustomEvent("aimy:analytics", { detail: { name } }));
}

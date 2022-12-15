const helpBtn = document.querySelector(".help-btn");
const helpDialog = document.querySelector(".help-dialog");
const dialogCloseBtn = document.querySelector(".help-dialog-close-btn");
const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const email = document.querySelector("#email");
const complaint = document.querySelector("#complaint");
const submitBtn = document.querySelector("#submit");
const validationError = document.querySelector(".validation-error");
const complaintsContainer = document.querySelector(".complaints-container");

helpBtn.addEventListener("click", openDialog);
dialogCloseBtn.addEventListener("click", closeDialog);
submitBtn.addEventListener("click", submitComplaint);

function openDialog() {
  helpDialog.style.display = "block";
}

function closeDialog() {
  helpDialog.style.display = "none";
}

function submitComplaint() {
  if (isComplaintValid()) {
    displayComplaint();
    clearDialogValues();
    closeDialog();
  } else {
    displayErrors();
  }
}

function isComplaintValid() {
  if (
    !firstName.value ||
    !lastName.value ||
    email.validity.typeMismatch ||
    !complaint.value
  ) {
    return false;
  }

  clearErrors();
  return true;
}

function displayComplaint() {
  // Create elements
  const complaintContainer = document.createElement("div");
  const firstNameParagraph = constructComplaintParagraph(
    "First Name: ",
    "first-name-log",
    firstName.value
  );
  const lastNameParagraph = constructComplaintParagraph(
    "Last Name: ",
    "last-name-log",
    lastName.value
  );
  const emailParagraph = constructComplaintParagraph(
    "Email Address: ",
    "email-log",
    email.value
  );
  const complaintParagraph = constructComplaintParagraph(
    "Complaint: ",
    "complaint-log",
    complaint.value
  );
  const dateOfComplaintParagraph = constructComplaintParagraph(
    "Date of complaint: ",
    "date-log",
    new Date().toLocaleString()
  );
  // Add attributes to elements
  complaintContainer.classList.add("complaint-container");
  // Append elements to document
  complaintsContainer.append(complaintContainer);
  complaintContainer.append(
    firstNameParagraph,
    lastNameParagraph,
    emailParagraph,
    complaintParagraph,
    dateOfComplaintParagraph
  );
}

function clearDialogValues() {
  firstName.value = "";
  lastName.value = "";
  email.value = "";
  complaint.value = "";
}

function constructComplaintParagraph(paragraphTitle, spanId, complaintValue) {
  // Create elements
  const paragraph = document.createElement("p");
  const span = document.createElement("span");
  // Add attributes to elements
  span.id = spanId;
  // Insert text content
  paragraph.textContent = paragraphTitle;
  span.textContent = complaintValue;
  // append span to paragraph
  paragraph.append(span);
  // return constructed paragraph
  return paragraph;
}

function displayErrors() {
  validationError.style.display = "block";
  if (!firstName.value) {
    applyErrorToField(firstName);
  }
  if (!lastName.value) {
    applyErrorToField(lastName);
  }
  if (!email.value || email.validity.typeMismatch) {
    applyErrorToField(email);
  }
  if (!complaint.value) {
    applyErrorToField(complaint);
  }
}

function clearErrors() {
  validationError.style.display = "none";
  clearErrorFromField(firstName);
  clearErrorFromField(lastName);
  clearErrorFromField(email);
  clearErrorFromField(complaint);
}

function applyErrorToField(field) {
  field.style.border = "1px solid red";
}

function clearErrorFromField(field) {
  field.style.border = "1px solid gray";
}

const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

//console.log(initialCards); //added to see better work on console.

const editProfileButton = document.querySelector(".profile__edit");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseButton = editProfileModal.querySelector(
  ".modal__close-button"
);

const newPostButton = document.querySelector(".profile__button");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseButton = newPostModal.querySelector(".modal__close-button");

//const profileTitle= document.querySelector(".profile__title"); for profile edit works.
const profileTitle = document.querySelector(".profile__title"); // Gets "Bessie Coleman"
const profileText = document.querySelector(".profile__text"); // Gets "Civil Aviator"
const profileNameInput = editProfileModal.querySelector("#profile-name-input"); // The name input field
const descriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
); // The description input field

const cardCaptionInput = newPostModal.querySelector("#card-caption-input"); //Targets the caption input
const linkInput = newPostModal.querySelector("#card-image-input"); //Targets the link input

const addCardFormElement = newPostModal.querySelector("#newpost-form"); //The card input field

const profileFormElement = editProfileModal.querySelector("#edit-form");

//created the submission form handler.
function handleProfileFormSubmit(evt) {
  // Step 1: Prevent default behavior
  // Prevent default browser behavior.
  evt.preventDefault();
  // Step 2: Update profile display elements
  profileTitle.textContent = profileNameInput.value;
  profileText.textContent = descriptionInput.value;
  // Step 3: Close the modal
  editProfileModal.classList.remove("modal_is-opened");
}

//Have set the submit listener.
profileFormElement.addEventListener("submit", handleProfileFormSubmit);

//created the submission form handler.
function handleAddCardSubmit(evt) {
  // Step 1: Prevent default behavior
  // Prevent default browser behavior.
  evt.preventDefault();
  // Step 2: Log both input values to the console
  console.log(cardCaptionInput.value);
  console.log(linkInput.value);
  // Step 3: Close the modal
  newPostModal.classList.remove("modal_is-opened");
}

// Create the submit listener.
addCardFormElement.addEventListener("submit", handleAddCardSubmit);

editProfileButton.addEventListener("click", function () {
  editProfileModal.classList.add("modal_is-opened");

  profileNameInput.value = profileTitle.textContent;
  descriptionInput.value = profileText.textContent;
});

editProfileCloseButton.addEventListener("click", function () {
  editProfileModal.classList.remove("modal_is-opened");
});

newPostButton.addEventListener("click", function () {
  newPostModal.classList.add("modal_is-opened");
});

newPostCloseButton.addEventListener("click", function () {
  newPostModal.classList.remove("modal_is-opened");
});

//array.forEach((element) => {});
initialCards.forEach((element) => {
  console.log(element.name);
});

/*holding bar for laters maybe.
const Title = document.querySelector(".profile__title");
const profileText = document.querySelector(".profile__text");
*/

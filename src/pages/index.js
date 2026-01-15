import "./index.css";
import {
  enableValidation,
  settings,
  disabledButton,
  resetValidation,
} from "../scripts/validation.js";
import { renderLoading } from "../utils/helpers.js";
import Api from "../utils/Api.js";

// const initialCards = [
//   {
//     name: "Golden Gate Bridge",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
//   },
//   {
//     name: "Val Thorens",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
//   },
//   {
//     name: "Restaurant terrace",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
//   },
//   {
//     name: "An outdoor cafe",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
//   },
//   {
//     name: "A very long bridge, over the forest and through the trees",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
//   },
//   {
//     name: "Tunnel with morning light",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
//   },
//   {
//     name: "Mountain house",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
//   },
// ];

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "796a3d98-ece2-444b-9ac5-30a564e35122",
    "Content-Type": "application/json",
  },
});

let userId;

const profileAvatar = document.querySelector(".profile__image");

api
  .getAppInfo()
  .then(([userData, cards]) => {
    userId = userData._id; //
    profileTitle.textContent = userData.name;
    profileText.textContent = userData.about;
    profileAvatar.src = userData.avatar;

    cards.forEach((element) => {
      const cardElement = getCardElement(element);
      cardsList.append(cardElement);
    });
  })
  .catch(console.error);

const editProfileButton = document.querySelector(".profile__edit");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileSubmitButton = editProfileModal.querySelector(
  ".modal__submit-button"
);
const editProfileCloseButton = editProfileModal.querySelector(
  ".modal__close-button"
);

const newPostButton = document.querySelector(".profile__button");
const newPostModal = document.querySelector("#new-post-modal");
const newPostSubmitButton = newPostModal.querySelector(".modal__submit-button");
const newPostCloseButton = newPostModal.querySelector(".modal__close-button");

const deleteModal = document.querySelector("#delete-modal");
const deleteForm = deleteModal.querySelector(".modal__form");
const deleteSubmitButton = deleteForm.querySelector('button[type="submit"]');
const deleteCancelButton = deleteForm.querySelector('button[type="button"]');
const deleteCloseButton = deleteModal.querySelector(".modal__close-delete");

const avatarModal = document.querySelector("#avatar-modal");
const avatarForm = avatarModal.querySelector("#edit-avatar-form");
const avatarSubmitButton = avatarModal.querySelector(".modal__submit-button");
const avatarModalCloseButton = avatarModal.querySelector(
  ".modal__close-button"
);
const avatarInput = avatarModal.querySelector("#profile-avatar-input");
const avatarModalButton = document.querySelector(".profile__avatar-btn");

const profileTitle = document.querySelector(".profile__title");
const profileText = document.querySelector(".profile__text");
const profileNameInput = editProfileModal.querySelector("#profile-name-input");
const descriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);

const cardCaptionInput = newPostModal.querySelector("#card-caption-input");
const linkInput = newPostModal.querySelector("#card-image-input");

const addCardFormElement = newPostModal.querySelector("#newpost-form");

const profileFormElement = editProfileModal.querySelector("#edit-form");

const previewModal = document.querySelector("#preview-modal");
const previewModalCloseButton = previewModal.querySelector(
  ".modal__close-image"
);
const previewImage = previewModal.querySelector(".modal__image");

const previewTitle = document.querySelector(".modal__text");

const cardTemplate = document.querySelector("#cards-template");
const cardsList = document.querySelector(".cards__list");

function handleDeleteSubmit(evt) {
  evt.preventDefault();

  renderLoading(true, deleteSubmitButton, "Deleting...", "Delete");
  api
    .deleteCard(selectedCardID)
    .then(() => {
      selectedCard.remove();
      closeModal(deleteModal);
    })
    .catch(console.error)
    .finally(() => {
      renderLoading(false, deleteSubmitButton, "Deleting...", "Delete");
    });
}

function handleDeleteCard(cardElement, cardId) {
  selectedCard = cardElement;
  selectedCardID = cardId;
  openModal(deleteModal);
}

function handleLike(evt, id) {
  const likeButton = evt.target;
  const isLiked = likeButton.classList.contains("card__button_active");

  api
    .changeLike(id, isLiked)
    .then((updatedCard) => {
      if (updatedCard.isLiked) {
        likeButton.classList.add("card__button_active");
      } else {
        likeButton.classList.remove("card__button_active");
      }
    })
    .catch(console.error);
}

let selectedCard;
let selectedCardID;

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);
  const cardTitleElement = cardElement.querySelector(".card__text");
  const cardImageElement = cardElement.querySelector(".card__image");

  cardImageElement.src = data.link;
  cardImageElement.alt = data.name;
  cardTitleElement.textContent = data.name;

  const cardLikeButton = cardElement.querySelector(".card__button");
  if (data.isLiked) {
    cardLikeButton.classList.add("card__button_active");
  }

  cardLikeButton.addEventListener("click", (evt) => handleLike(evt, data._id));

  const cardTrashButton = cardElement.querySelector(".card__trash-button");
  cardTrashButton.addEventListener("click", () =>
    handleDeleteCard(cardElement, data._id)
  );

  cardImageElement.addEventListener("click", () => {
    previewImage.src = data.link;
    previewImage.alt = data.name;
    previewTitle.textContent = data.name;
    openModal(previewModal);
  });

  return cardElement;
}

function openModal(modal) {
  modal.classList.add("modal_is-opened");

  modal.addEventListener("mousedown", closeOnOverlay);
  document.addEventListener("keydown", closeOnEscape);
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");

  modal.removeEventListener("mousedown", closeOnOverlay);
  document.removeEventListener("keydown", closeOnEscape);
}

function closeOnOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget);
  }
}

function closeOnEscape(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_is-opened");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  renderLoading(true, editProfileSubmitButton);

  api
    .editUserInfo({
      name: profileNameInput.value,
      about: descriptionInput.value,
    })
    .then((updatedUser) => {
      profileTitle.textContent = updatedUser.name;
      profileText.textContent = updatedUser.about;
      closeModal(editProfileModal);

      evt.target.reset();
      disabledButton(editProfileSubmitButton, settings);
    })
    .catch(console.error)
    .finally(() => {
      renderLoading(false, editProfileSubmitButton);
    });
}

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();

  renderLoading(true, avatarSubmitButton);

  api
    .editAvatarInfo(avatarInput.value)
    .then((updatedUser) => {
      profileAvatar.src = updatedUser.avatar;
      closeModal(avatarModal);

      evt.target.reset();
      disabledButton(avatarSubmitButton, settings);
    })
    .catch(console.error)
    .finally(() => {
      renderLoading(false, avatarSubmitButton);
    });
}

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

function handleAddCardSubmit(evt) {
  evt.preventDefault();

  renderLoading(true, newPostSubmitButton);

  api
    .addCard({
      name: cardCaptionInput.value,
      link: linkInput.value,
    })
    .then((newCard) => {
      const cardElement = getCardElement(newCard);
      cardsList.prepend(cardElement);
      closeModal(newPostModal);
      evt.target.reset();
      disabledButton(newPostSubmitButton, settings);
    })
    .catch(console.error)
    .finally(() => {
      renderLoading(false, newPostSubmitButton);
    });
}

addCardFormElement.addEventListener("submit", handleAddCardSubmit);

avatarForm.addEventListener("submit", handleAvatarFormSubmit);

deleteForm.addEventListener("submit", handleDeleteSubmit);

deleteCancelButton.addEventListener("click", function () {
  closeModal(deleteModal);
});

editProfileButton.addEventListener("click", function () {
  openModal(editProfileModal);

  profileNameInput.value = profileTitle.textContent;
  descriptionInput.value = profileText.textContent;

  resetValidation(
    profileFormElement,
    [profileNameInput, descriptionInput],
    settings
  );
});

deleteCloseButton.addEventListener("click", function () {
  closeModal(deleteModal);
});

deleteCancelButton.addEventListener("click", function () {
  closeModal(deleteModal);
});

editProfileCloseButton.addEventListener("click", function () {
  closeModal(editProfileModal);
});

previewModalCloseButton.addEventListener("click", function () {
  closeModal(previewModal);
});

newPostButton.addEventListener("click", function () {
  openModal(newPostModal);
});

newPostCloseButton.addEventListener("click", function () {
  closeModal(newPostModal);
});

avatarModalButton.addEventListener("click", () => {
  openModal(avatarModal);
});

avatarModalCloseButton.addEventListener("click", function () {
  closeModal(avatarModal);
});

enableValidation(settings);

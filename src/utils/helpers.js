export function setButtonText(
  btn,
  isLoading,
  loadingText = "Saving...",
  defaultText = "Save"
) {
  if (isLoading) {
    btn.textContent = loadingText;
    btn.disabled = true;
  } else {
    btn.textContent = defaultText;
    btn.disabled = false;
  }
}

export function renderLoading(isLoading, btn, loadingText, defaultText) {
  setButtonText(btn, isLoading, loadingText, defaultText);
}

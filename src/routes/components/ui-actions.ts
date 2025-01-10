import type { KeyboardEventHandler } from "svelte/elements";

export const handleScreenAction: KeyboardEventHandler<Window> = (event) => {
  switch (event.key) {
    case "ArrowUp":
      incrementInput();
      break;
    case "ArrowLeft":
      activatePreviousElement();
      break;
    case "ArrowDown":
      decrementInput();
      break;
    case "ArrowRight":
      activateNextElement();
      break;
    case "Enter":
    case "NumpadEnter":
    case " ":
      selectActive();
      break;
    case "Backspace":
    case "Delete":
      removeLastNumberFromInput();
      break;
    case "1":
      addNumberToInput(1);
      break;
    case "2":
      addNumberToInput(2);
      break;
    case "3":
      addNumberToInput(3);
      break;
    case "4":
      addNumberToInput(4);
      break;
    case "5":
      addNumberToInput(5);
      break;
    case "6":
      addNumberToInput(6);
      break;
    case "7":
      addNumberToInput(7);
      break;
    case "8":
      addNumberToInput(8);
      break;
    case "9":
      addNumberToInput(9);
      break;
    case "0":
      addNumberToInput(0);
      break;
    default:
      break;
  }
};

export const triggerKeydown = (key: string) => {
  window.dispatchEvent(
    new KeyboardEvent("keydown", {
      key: key,
      code: key,
      bubbles: true,
    })
  );
};

export const initActivatableElements = () => {
  const displayPanel = document.querySelector(
    "#display-panel"
  ) as HTMLElement | null;

  if (!displayPanel) {
    return;
  }

  const activatableElements = displayPanel.querySelectorAll(
    "#display-panel [data-activatable]"
  ) as NodeListOf<HTMLElement>;

  let lastIndex = "0";
  activatableElements.forEach((activableElement, key) => {
    activableElement.dataset.activatableIndex = key.toString();
    lastIndex = key.toString();
  });

  displayPanel.dataset.lastActivatableIndex = lastIndex;
};

const getFirstActivatableElement = () => {
  return document.querySelector(
    "#display-panel [data-activatable-index='0']"
  ) as HTMLElement | null;
};

const getLastActivatableElement = () => {
  const displayPanel = document.querySelector(
    "#display-panel"
  ) as HTMLElement | null;

  if (!displayPanel) {
    return;
  }

  const lastActivatableIndex = displayPanel.dataset.lastActivatableIndex ?? "0";

  return document.querySelector(
    `#display-panel [data-activatable-index='${lastActivatableIndex}']`
  ) as HTMLElement | null;
};

export const getCurrentActiveElement = () => {
  const currentActiveElement = document.querySelector(
    `#display-panel [data-is-active]`
  ) as HTMLElement | null;

  if (currentActiveElement) {
    return currentActiveElement;
  }

  const firstActivatableElement = getFirstActivatableElement();

  if (!firstActivatableElement) {
    return null;
  }

  return firstActivatableElement;
};

const activateElement = (element: HTMLElement) => {
  const currentActiveElement = getCurrentActiveElement();
  if (currentActiveElement) {
    currentActiveElement.removeAttribute("data-is-active");
  }

  element.dataset.isActive = "";
};

const getNextActivatableElement = () => {
  const currentActiveElement = getCurrentActiveElement();

  if (!currentActiveElement) {
    return null;
  }

  const activatableIndex = Number(
    currentActiveElement.dataset.activatableIndex
  );
  const nextElement = document.querySelector(
    `#display-panel [data-activatable-index="${activatableIndex + 1}"]`
  ) as HTMLElement | null;

  if (nextElement) {
    return nextElement;
  }

  // loop back to first
  return getFirstActivatableElement();
};

const getPreviousActivatableElement = () => {
  const currentActiveElement = getCurrentActiveElement();

  if (!currentActiveElement) {
    return null;
  }

  const activatableIndex = Number(
    currentActiveElement.dataset.activatableIndex
  );
  const previousElement = document.querySelector(
    `#display-panel [data-activatable-index="${activatableIndex - 1}"]`
  ) as HTMLElement | null;

  if (previousElement) {
    return previousElement;
  }

  // loop back to first
  return getLastActivatableElement();
};

export const activateNextElement = () => {
  const nextElement = getNextActivatableElement();

  if (nextElement) {
    activateElement(nextElement);
  }
};

export const activatePreviousElement = () => {
  const previousElement = getPreviousActivatableElement();

  if (previousElement) {
    activateElement(previousElement);
  }
};

export const selectActive = () => {
  const currentActiveElement = getCurrentActiveElement();

  if (currentActiveElement) {
    currentActiveElement.click();
  }
};

export const incrementInput = () => {
  const onScreenInput = getOnScreenInput();

  if (onScreenInput) {
    onScreenInput.stepUp();
    onScreenInput.dispatchEvent(new Event("input", { bubbles: true }));
  }
};

export const decrementInput = () => {
  const onScreenInput = getOnScreenInput();

  if (onScreenInput) {
    onScreenInput.stepDown();
    onScreenInput.dispatchEvent(new Event("input", { bubbles: true }));
  }
};

const getOnScreenInput = () => {
  return document.querySelector(
    'input[type="number"]'
  ) as HTMLInputElement | null;
};

export const addNumberToInput = (number: number) => {
  const onScreenInput = getOnScreenInput();

  if (onScreenInput) {
    const newValue = onScreenInput.value + number;
    onScreenInput.value = Math.min(
      parseInt(onScreenInput.max),
      parseInt(newValue)
    ).toString();
    onScreenInput.dispatchEvent(new Event("input", { bubbles: true }));
  }
};

export const removeLastNumberFromInput = () => {
  const onScreenInput = getOnScreenInput();

  if (onScreenInput) {
    onScreenInput.value = onScreenInput.value.slice(0, -1);
    onScreenInput.dispatchEvent(new Event("input", { bubbles: true }));
  }
};

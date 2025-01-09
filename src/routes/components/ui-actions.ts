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

export const initActiveElement = () => {
  const activeElement = document.querySelector(
    "#display-panel [data-active-index='0']"
  ) as HTMLElement | null;

  if (activeElement) {
    activeElement.dataset.isActive = "";
  }
};

export const getCurrentActiveElement = (): HTMLElement | null => {
  const activeElement = document.querySelector(
    `#display-panel [data-is-active]`
  ) as HTMLElement | null;

  if (!activeElement) {
    initActiveElement();
  }

  return activeElement;
};

export const activateNextElement = () => {
  const currentActiveElement = getCurrentActiveElement();

  if (currentActiveElement) {
    const activeIndex = Number(currentActiveElement.dataset.activeIndex);
    const nextElement = document.querySelector(
      `#display-panel [data-active-index="${activeIndex + 1}"]`
    ) as HTMLElement | null;

    if (nextElement) {
      currentActiveElement.removeAttribute("data-is-active");
      nextElement.dataset.isActive = "";
    }
  }
};

export const activatePreviousElement = () => {
  const currentActiveElement = getCurrentActiveElement();

  if (currentActiveElement) {
    const activeIndex = Number(currentActiveElement.dataset.activeIndex);
    const previousElement = document.querySelector(
      `#display-panel [data-active-index="${activeIndex - 1}"]`
    ) as HTMLElement | null;

    if (previousElement) {
      currentActiveElement.removeAttribute("data-is-active");
      previousElement.dataset.isActive = "";
    }
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

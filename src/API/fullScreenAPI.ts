export interface IEnterFullScreenElement extends HTMLElement {
  /** Firefox */
  mozRequestFullScreen(): Promise<void>;
  /** Chrome, Safari and Opera */
  webkitRequestFullscreen(): Promise<void>;
  /** IE/Edge */
  msRequestFullscreen(): Promise<void>;

  mozRequestPointerLock: () => void;
  webkitRequestPointerLock: () => void;
}

interface IExitFullScreenElement {
  mozCancelFullScreen(): Promise<void>;

  webkitExitFullscreen(): Promise<void>;

  msExitFullscreen(): Promise<void>;
}

export function enterFullScreen(element: IEnterFullScreenElement) {
  if (element == null) {
    return;
  }

  element.requestPointerLock = element.requestPointerLock
    || element.mozRequestPointerLock
    || element.webkitRequestPointerLock;

  element.requestPointerLock();

  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}

export function exitFullScreen() {
  const doc = document as Document & IExitFullScreenElement;

  if (doc.exitFullscreen) {
    doc.exitFullscreen();
  } else if (doc.mozCancelFullScreen) {
    doc.mozCancelFullScreen();
  } else if (doc.webkitExitFullscreen) {
    doc.webkitExitFullscreen();
  } else if (doc.msExitFullscreen) {
    doc.msExitFullscreen();
  }
}

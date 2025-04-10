export const enterAnimations = {
  // Bounce In
  bounceIn: {
    opacity: [0, 0.5, 1],
    scale: [0.5, 1.2, 1],
    transition: { duration: 0.3 },
  },
  bounceInDown: {
    opacity: [0, 0.5, 1],
    y: [-100, 20, 0],
    transition: { duration: 0.3 },
  },
  bounceInUp: {
    opacity: [0, 0.5, 1],
    y: [100, -20, 0],
    transition: { duration: 0.3 },
  },
  bounceInLeft: {
    opacity: [0, 0.5, 1],
    x: [-100, 20, 0],
    transition: { duration: 0.3 },
  },
  bounceInRight: {
    opacity: [0, 0.5, 1],
    x: [100, -20, 0],
    transition: { duration: 0.3 },
  },

  // Fade In
  fadeIn: { opacity: [0, 0.7, 1], transition: { duration: 1 } },
  fadeInDown: {
    y: [-100, 0],
    opacity: [0, 0.7, 1],
    transition: { duration: 0.3 },
  },
  fadeInDownBig: {
    y: [-200, 0],
    opacity: [0, 0.7, 1],
    transition: { duration: 1.2 },
  },
  fadeInUp: {
    y: [100, 0],
    opacity: [0, 0.7, 1],
    transition: { duration: 0.3 },
  },
  fadeInUpBig: {
    y: [200, 0],
    opacity: [0, 0.7, 1],
    transition: { duration: 1.2 },
  },
  fadeInLeft: {
    x: [-100, 0],
    opacity: [0, 0.7, 1],
    transition: { duration: 0.3 },
  },
  fadeInLeftBig: {
    x: [-200, 0],
    opacity: [0, 0.7, 1],
    transition: { duration: 1.2 },
  },
  fadeInRight: {
    x: [100, 0],
    opacity: [0, 0.7, 1],
    transition: { duration: 0.3 },
  },
  fadeInRightBig: {
    x: [200, 0],
    opacity: [0, 0.7, 1],
    transition: { duration: 1.2 },
  },

  // Flip In
  flipInX: {
    rotateX: [-90, 0],
    opacity: [0, 0.7, 1],
    transition: { duration: 0.3 },
  },
  flipInY: {
    rotateY: [-90, 0],
    opacity: [0, 0.7, 1],
    transition: { duration: 0.3 },
  },

  // LightSpeed In
  lightSpeedIn: {
    x: [1000, 0],
    opacity: [0, 0.7, 1],
    transition: { duration: 0.3 },
  },

  // Slide In
  slideInDown: {
    y: [-100, 0],
    opacity: [0, 0.7, 1],
    transition: { duration: 0.3 },
  },
  slideInUp: {
    y: [100, 0],
    opacity: [0, 0.7, 1],
    transition: { duration: 0.3 },
  },
  slideInLeft: {
    x: [-100, 0],
    opacity: [0, 0.7, 1],
    transition: { duration: 0.3 },
  },
  slideInRight: {
    x: [100, 0],
    opacity: [0, 0.7, 1],
    transition: { duration: 0.3 },
  },

  // Zoom In
  zoomIn: {
    scale: [0, 1],
    opacity: [0, 0.7, 1],
    transition: { duration: 0.3 },
  },
  zoomInDown: {
    scale: [0, 1],
    y: [-100, 0],
    opacity: [0, 0.7, 1],
    transition: { duration: 0.3 },
  },
  zoomInUp: {
    scale: [0, 1],
    y: [100, 0],
    opacity: [0, 0.7, 1],
    transition: { duration: 0.3 },
  },
  zoomInLeft: {
    scale: [0, 1],
    x: [-100, 0],
    opacity: [0, 0.7, 1],
    transition: { duration: 0.3 },
  },
  zoomInRight: {
    scale: [0, 1],
    x: [100, 0],
    opacity: [0, 0.7, 1],
    transition: { duration: 0.3 },
  },
};
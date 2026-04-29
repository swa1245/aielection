import gsap from 'gsap';

export const staggerFadeIn = (elements, duration = 0.5, stagger = 0.1) => {
  return gsap.fromTo(elements, 
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration, stagger, ease: 'power2.out' }
  );
};

export const typewriterEffect = (element, text, durationPerChar = 0.05, onComplete) => {
  element.textContent = '';
  const chars = text.split('');
  
  // Wrap each char in a span for individual animation
  chars.forEach(char => {
    const span = document.createElement('span');
    span.textContent = char;
    span.style.opacity = '0';
    element.appendChild(span);
  });

  return gsap.to(element.children, {
    opacity: 1,
    duration: durationPerChar,
    stagger: durationPerChar,
    ease: 'none',
    onComplete
  });
};

export const rotateAnimation = (element, duration = 1) => {
  return gsap.to(element, {
    rotation: 360,
    duration,
    repeat: -1,
    ease: 'linear'
  });
};

export const bounceAnimation = (element) => {
  return gsap.to(element, {
    y: -10,
    duration: 0.5,
    yoyo: true,
    repeat: -1,
    ease: 'power1.inOut'
  });
};

export const drawSVG = (element) => {
  // Simple height expansion for lines acting as draw
  return gsap.fromTo(element, 
    { height: 0 },
    { height: '100%', duration: 1.5, ease: 'power2.out' }
  );
};

const bars = () => {
  const barsHeight = 3;
  const scaleTime = 0.6;
  const timeBetweenBars = 0.1;

  const barsElement = document.querySelectorAll('#voice-bars > *');

  const tl = new TimelineMax({ onComplete: bars });

  const scale = () => {
    return 0.1 + Math.floor(Math.random() * barsHeight);
  }

  const color = () => {
    const colors = ['#006a95', '#58ada0', '#f9e0af', '#ff5c00', '#ff1400'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  tl.set(barsElement, { y: -30, transformOrigin: '50% 50%' })
    .to(barsElement, {
      duration: scaleTime,
      scaleY: scale,
      fill: color,
      ease: 'bounce.in',
      stagger: {
        each: timeBetweenBars,
        yoyo: true,
        repeat: 1
      }
    });
  return tl;
}

const move = () => {
  const moveTime = 0.6;
  const timeBetweenLegs = 0.6;
  const legs = document.querySelectorAll('#leg-right, #leg-left');

  const tl = new TimelineMax();

  tl.to(legs, {
    duration: moveTime,
    y: -60,
    ease: 'power1.out',
    stagger: {
      each: timeBetweenLegs,
      yoyo: true,
      repeat: -1
    }
  });
  return tl;
}

const blink = () => {
  const eyes = document.querySelectorAll('#eye-right, #eye-left');

  const tl = new TimelineMax({ repeat: -1, repeatDelay: 3, delay: 2 });

  tl
    .set(eyes, { transformOrigin: '50% 50%' })
    .to(eyes, { duration: .1, scaleY: 0, fill: '#231f20' })
    .to(eyes, { duration: .05, scaleY: 1, fill: '#006a95' })
    .to(eyes, { duration: .12, scaleY: 0, fill: '#231f20' }, '+=0.1')
    .to(eyes, { duration: .03, scaleY: 1, fill: '#006a95' })
    .to(eyes, { duration: .08, scaleY: 0, fill: '#231f20' }, '+=1.8')
    .to(eyes, { duration: .08, scaleY: 1, fill: '#006a95' });

  return tl;
}

// const master = new TimelineMax();
// master.add('start');
// master.add(bars(), 'start');
// master.add(move(), 'start');
// master.add(blink(), 'start');
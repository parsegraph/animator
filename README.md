# Animator

Animator manages a date-based percent value.

    import Animator from 'parsegraph-animator';

    const interval = 3000;
    const anim = new Animator(interval);
    anim.restart();
    const animate = ()=>{
      console.log(anim.t());
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
    setTimeout(()=>anim.restart(), interval);

Output:

    anim.t() counts from 0 to 1 over 3s, repeating every 3s.

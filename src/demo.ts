import Animator from ".";

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("demo");
  root.style.position = "relative";

  const interval = 3000;
  const anim = new Animator(interval - 1000);

  const bar = document.createElement('div');
  bar.style.position = "relative";
  bar.style.backgroundColor = "white";
  bar.style.border = "1px solid black";
  bar.style.width = "100px";
  bar.style.height = "16px";
  bar.style.borderRadius = "3px";
  bar.style.overflow = "hidden";

  const barVal = document.createElement("div");
  barVal.style.position = "absolute";
  barVal.style.left = "0";
  barVal.style.height = "100%";

  bar.appendChild(barVal);

  const container = document.createElement("div");
  container.appendChild(bar);
  container.style.position = "absolute";
  container.style.left = "0px";
  container.style.top = "0px";
  container.style.pointerEvents = "none";
  root.appendChild(container);
  container.style.fontSize = "18px";
  container.style.fontFamily = "sans";
  const refresh = () => {
    const rand = () => Math.floor(Math.random() * 255);
    document.body.style.backgroundColor = `rgb(${rand()}, ${rand()}, ${rand()})`;
    container.style.color = `rgb(${rand()}, ${rand()}, ${rand()})`;
    container.style.left = `${Math.random() * root.clientWidth}px`;
    container.style.top = `${Math.random() * root.clientHeight}px`;
    anim.restart();
    barVal.style.backgroundColor = container.style.color;

    const animate = ()=>{
      barVal.style.width = Math.floor(anim.t()*100) + "%";
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  };

  const dot = document.createElement("div");
  dot.style.position = "absolute";
  dot.style.right = "8px";
  dot.style.top = "8px";
  dot.style.width = "16px";
  dot.style.height = "16px";
  dot.style.borderRadius = "8px";
  dot.style.transition = "background-color 400ms";
  dot.style.backgroundColor = "#222";
  root.appendChild(dot);

  container.style.transition = "color 2s, left 2s, top 2s";
  document.body.style.transition = "background-color 2s";
  let timer: any = null;
  let dotTimer: any = null;
  let dotIndex = 0;
  const dotState = ["#f00", "#c00"];
  const refreshDot = () => {
    dotIndex = (dotIndex + 1) % dotState.length;
    dot.style.backgroundColor = dotState[dotIndex];
  };
  const dotInterval = 500;
  root.addEventListener("click", () => {
    if (timer) {
      clearInterval(timer);
      timer = null;
      clearInterval(dotTimer);
      dotTimer = null;
      dot.style.transition = "background-color 3s";
      dot.style.backgroundColor = "#222";
    } else {
      refresh();
      dot.style.transition = "background-color 400ms";
      refreshDot();
      timer = setInterval(refresh, interval);
      dotTimer = setInterval(refreshDot, dotInterval);
    }
  });
});

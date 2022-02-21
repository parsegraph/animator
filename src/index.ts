export default class Animator {
  _initialDuration:number;
  _currentDateProvider:Function;
  _animating:Date;
  _finish:Date;

  constructor(initialDuration:number) {
    this._initialDuration = initialDuration;

    this._currentDateProvider = ()=>{
      return new Date();
    };
  }

  restart():void {
    // console.log(new Error("Animation started"));
    if (!this.animating()) {
      this._animating = this.getCurrentDate();
    }
    this._finish = new Date(this._animating);
    this._finish.setMilliseconds(this._finish.getMilliseconds()+this.initialDuration());
  }

  stop() {
    console.log("Animation stopped");
    this._animating = null;
  }

  animating() {
    return !!this._animating;
  }

  t() {
    if (!this.animating()) {
      return 0;
    }
    const now = this.getCurrentDate();
    const start = this.getStart();
    let t = (now.getTime() - start.getTime()) / this.duration();
    // console.log("Getting t: ", t, " from now: " + now.getTime() + " start: " + start.getTime() + " duration=" + this.duration());
    if (t < 0) {
      t = 0;
    }
    if (t > 1) {
      t = 1;
    }
    return t;
  }

  finish() {
    this._animating.setMilliseconds(this._animating.getMilliseconds() - this.duration());
  }

  getStart() {
    return this._animating;
  }

  getFinish() {
    return this._finish;
  }

  duration() {
    if (!this.animating()) {
      return 0;
    }
    return this._finish.getTime() - this._animating.getTime();
  }

  setCurrentDateProvider(func:Function) {
    this._currentDateProvider = func;
  }

  getCurrentDate():Date {
    return this._currentDateProvider();
  }

  initialDuration() {
    return this._initialDuration;
  }
}

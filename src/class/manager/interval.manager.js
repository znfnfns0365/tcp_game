class IntervalManager {
  constructor() {
    this.intervals = new Map();
  }

  // userId가 key값으로 있는 value에 Map을 만들어 type을 key값으로 갖는 value에 Interval 생성(callBack 함수 interval 마다 실행)
  addUserInterval(userId, callBack, interval, type) {
    if (!this.intervals.has(userId)) {
      this.intervals.set(userId, new Map());
    }
    this.intervals.get(userId).set(type, setInterval(callBack, interval));
  }

  // userId로 저장된 모든 데이터 삭제
  removeUserInterval(userId) {
    if (this.intervals.has(userId)) {
      const userIntervals = this.intervals.get(userId);

      // forEach에 map 객체를 넣으면 첫 번째 인자에 value값이 들어가므로
      // intervalId에 setInterval함수가 반환한 ID가 들어가 이를 clearInterval 시키는 원리
      userIntervals.forEach((intervalId) => {
        clearInterval(intervalId);
        this.intervals.delete(userId);
      });
    }
  }

  // userId로 저장된 interval중 type이 key값으로 저장된 interval들을 삭제
  removeInterval(userId, type) {
    if (this.intervals.has(userId)) {
      const userIntervals = this.intervals.get(userId);
      if (userIntervals.has(type)) {
        clearInterval(userIntervals.get(type));
        userIntervals.delete(type);
      }
    }
  }

  clearAll() {
    // 마찬가지로 userIntervals에 value인 map 객체가 들어가고
    this.intervals.forEach((userIntervals) => {
      // intervalId에는 key 값인 type 대신 value 값인 setInterval함수가 반환한 ID가 들어감
      userIntervals.forEach((intervalId) => clearInterval(intervalId));
    });
    this.intervals.clear();
  }
}

export default IntervalManager;

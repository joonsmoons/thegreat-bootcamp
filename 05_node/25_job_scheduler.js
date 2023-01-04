// 작업 스케줄러 (job scheduler)
// 정해진 날짜 / 시간 / 분 /  초에 지정된 특정 작업을 수행하라고 미리 등록을 해놓은 것
// 특정 주기마다
// 1. 데이터 백업 : 매일 밤 12시, 매주 토요일 밤 12시.. 사용자가 시스템을 사용하지 않은 시간 동안 중요한 데이터 / 파일을 백업
// 2. 정리 리포트 : 기업에서 발생되는 중요한 데이터 - 신규 고객, 판매 현황, 매주 월요일 아침 7시에 지난주 한주간의 판매현황 리포트(엑셀파일)를 전송
// 3. 일정 관리 : 스마트폰에서 일정을 동록할 때 알림 설정, 30분전, 1시간전

// node-cron

const cron = require("node-cron");
cron.schedule("* * * * * *", () => {
  console.log("1초 마다 작업이 실행됩니다.");
});

cron.schedule("2 * * * * *", () => {
  console.log("매 시간의 2분마다 실행됩니다.");
});

cron.schedule("1,2,4,5 * * * * *", () => {
  console.log("매 시간의 1분, 2분, 4분, 5분 마다 실행됩니다.");
});

cron.schedule("1-10 * * * * *", () => {
  console.log("매 시간의 1분...10분 마다 실행됩니다.");
});

cron.schedule("0 7 * * * 1", () => {
  console.log("매 월요일 아침 7시 마다 작업이 실행됩니다.");
});

cron.schedule("0 0 * * *", () => {
  console.log("매일 밤 12시 마다 작업이 실행됩니다.");
});

const task = cron.schedule(
  "* * * * * *",
  () => {
    console.log("1초 마다 작업이 실행 됩니다.");
  },
  { scheduled: false } // start() 함수가 호출이 되어야만 실행이 됨.
);

task.start(); // 작업 시작
task.stop(); // 작업 멈춤
task.destroy(); // 작업 완전히 지움

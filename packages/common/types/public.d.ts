export type EvChargerAPIResponse<T> = {
  resultCode: string;
  resultMsg: string;
  totalCount: number;
  pageNo: number;
  numOfRows: number;
  items: {
    item: T[]; // 충전소 정보 목록;
  };
};

export type EvChargerAPIParameters = {
  pageNo?: number; // 페이지 번호
  numOfRows?: number; // 한 페이지에 표시할 항목 수
  dataType?: "JSON" | "XML"; // 응답 데이터 형식
  serviceKey?: string; // 공공 API 서비스 키
  statId?: string; // 충전소 ID (optional)
  chgerId?: string; // 충전기 ID (optional)
};

export type EvChargerGetChargerInfoItem = {
  statNm: string; // 충전소명
  statId: string; // 충전소ID
  chgerId: string; // 충전기ID
  chgerType: string; // 충전기타입
  addr: string; // 주소
  addrDetail: string; // 주소상세
  location?: string; // 상세위치 (optional)
  lat: string; // 위도
  lng: string; // 경도
  useTime: string; // 이용가능시간
  busiId: string; // 기관 아이디
  bnm: string; // 기관명
  busiNm: string; // 운영기관명
  busiCall: string; // 운영기관연락처
  stat: string; // 충전기상태
  statUpdDt: string; // 상태갱신일시
  lastTsdt?: string; // 마지막 충전시작일시 (optional)
  lastTedt?: string; // 마지막 충전종료일시 (optional)
  nowTsdt?: string; // 충전중 시작일시 (optional)
  output?: string; // 충전용량 (optional)
  method?: string; // 충전방식 (optional)
  zcode: string; // 지역코드
  zscode?: string; // 지역상세코드 (optional)
  kind?: string; // 충전소 구분 코드 (optional)
  kindDetail?: string; // 충전소 구분 상세코드 (optional)
  parkingFree?: "Y" | "N"; // 주차료 무료 여부 (optional)
  note?: string; // 충전소 안내사항 (optional)
  limitYn: "Y" | "N"; // 이용자 제한 여부
  limitDetail?: string; // 이용제한 사유 (optional)
  delYn: "Y" | "N"; // 삭제 여부
  delDetail?: string; // 삭제 사유 (optional)
  trafficYn: "Y" | "N"; // 편의제공 여부
  year: string; // 설치년도
};

export type EvChargerGetChargerStatusItem = {
  busiId: string; // 기관 아이디
  statId: string; // 충전소ID
  chgerId: string; // 충전기ID
  stat: string; // 충전기상태 (1: 통신이상, 2: 충전대기, 3: 충전중, 4: 운영중지, 5: 점검중, 9: 상태미확인)
  statUpdDt: string; // 상태갱신일시
  lastTsdt?: string; // 마지막 충전시작일시 (optional)
  lastTedt?: string; // 마지막 충전종료일시 (optional)
  nowTsdt?: string; // 충전중 시작일시 (optional)
};

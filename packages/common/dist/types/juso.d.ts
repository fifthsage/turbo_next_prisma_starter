export interface IJusoCommon {
  errorMessage: string;
  errorCode: string;
  currentPage: number;
  countPerPage: number;
  totalCount: number;
}

export interface IJusoItem {
  roadAddr: string;
  jibunAddr: string;
  engAddr: string;
  zipNo: string;
  admCd: string;
  rnMgtSn: string;
  bdMgtSn: string;
  detBdNmList: string;
  bdNm: string;
  bdKdcd: string;
  siNm: string;
  sggNm: string;
  emdNm: string;
  liNm: string;
  rn: string;
  udrtYn: string;
  buldMnnm: string;
  buldSlno: string;
  resultType: string;
}

export interface IJusoResult {
  common: IJusoCommon;
  juso: IJusoItem[];
}

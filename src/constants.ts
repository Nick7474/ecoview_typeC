/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const NAV_LINKS = [
  { name: "에코뷰 소개", href: "#intro" },
  { name: "4대 마일", href: "#mile" },
  { name: "탄소저금통", href: "#piggybank" },
  { name: "소통마당", href: "#community" },
];

export const SECTIONS = {
  vision: {
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    title: "당신의 행동이 데이터가 되고,",
    subtitle: "데이터가 광명을 바꿉니다.",
    description: "광명시 스마트시티 에코뷰 비전 2030",
  },
  livingLab: {
    title: "도시를 바꾸는 실험, 리빙랩",
    subtitle: "시민이 주도하는 도시 혁신",
    items: [
      { id: 1, title: "투명 페트병 분리배출", imageUrl: "https://picsum.photos/seed/pet/1200/800" },
      { id: 2, title: "밤길 안전 제보", imageUrl: "https://picsum.photos/seed/safety/1200/800" },
      { id: 3, title: "친환경 모빌리티", imageUrl: "https://picsum.photos/seed/mobility/1200/800" },
      { id: 4, title: "에너지 절감 챌린지", imageUrl: "https://picsum.photos/seed/energy/1200/800" },
    ],
  },
  openLab: {
    title: "오픈랩: 당신의 통찰력이\n광명의 정책이 됩니다.",
    subtitle: "데이터 기반 도시 혁신 플랫폼",
    imageUrl: "https://picsum.photos/seed/data-analysis/1920/1080",
  },
  education: {
    title: "기후의병 교육 현장",
    subtitle: "지속 가능한 미래를 위한 시민 역량 강화",
    imageUrl: "https://picsum.photos/seed/climate-edu/1920/1080",
    stats: [
      { label: "누적 교육생", value: 12540, suffix: "명" },
      { label: "참여 프로그램", value: 48, suffix: "개" },
      { label: "만족도", value: 98, suffix: "%" },
    ],
  },
};

export const FOOTER_CONTENT = {
  companyName: "광명시 에코뷰 (EcoView)",
  address: "경기도 광명시 시청로 20",
  phone: "02-2680-2114",
  links: [
    { name: "개인정보처리방침", href: "#" },
    { name: "이용약관", href: "#" },
    { name: "이메일무단수집거부", href: "#" },
  ],
};

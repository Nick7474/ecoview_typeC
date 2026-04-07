/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FOOTER_CONTENT } from "../constants";
import { Facebook, Instagram, Youtube, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-white text-gray-900 py-[68px] relative border-t border-gray-100">
      <div className="w-full px-6 md:px-[180px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-2 mb-2">
              <img src="/logo.png" alt="ECOVIEW" className="h-10 w-auto object-contain" />
            </div>
            <p className="text-gray-500 font-medium text-lg leading-relaxed">
              광명시의 지속 가능한 미래를 위한<br />시민 참여형 데이터 플랫폼입니다.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="p-3 bg-gray-50 hover:bg-blue-50 rounded-full transition-all text-gray-400 hover:text-blue-600">
                <Facebook size={24} />
              </a>
              <a href="#" className="p-3 bg-gray-50 hover:bg-blue-50 rounded-full transition-all text-gray-400 hover:text-blue-600">
                <Instagram size={24} />
              </a>
              <a href="#" className="p-3 bg-gray-50 hover:bg-blue-50 rounded-full transition-all text-gray-400 hover:text-blue-600">
                <Youtube size={24} />
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <h4 className="text-xl font-bold text-gray-900">주요 메뉴</h4>
            <ul className="flex flex-col gap-5 text-gray-500 font-medium text-lg">
              <li><a href="#" className="hover:text-blue-600 transition-colors">에코뷰 소개</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">4대 마일</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">탄소저금통</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">소통마당</a></li>
            </ul>
          </div>

          <div className="flex flex-col gap-8">
            <h4 className="text-xl font-bold text-gray-900">시민 참여</h4>
            <ul className="flex flex-col gap-5 text-gray-500 font-medium text-lg">
              <li><a href="#" className="hover:text-blue-600 transition-colors">리빙랩 참여</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">오픈랩 제안</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">데이터 분석</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">교육 신청</a></li>
            </ul>
          </div>

          <div className="flex flex-col gap-8">
            <h4 className="text-xl font-bold text-gray-900">Contact</h4>
            <div className="flex flex-col gap-5 text-gray-500 font-medium text-lg">
              <p>대표전화: <span className="text-gray-900 font-bold">{FOOTER_CONTENT.phone}</span></p>
              <p>주소: {FOOTER_CONTENT.address}</p>
              <p>상호명: {FOOTER_CONTENT.companyName}</p>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-8 text-sm text-gray-400 font-bold uppercase tracking-widest">
            {FOOTER_CONTENT.links.map((link) => (
              <a key={link.name} href={link.href} className="hover:text-blue-600 transition-colors">
                {link.name}
              </a>
            ))}
          </div>
          <p className="text-sm text-gray-400 font-bold">
            © 2026 GWANGMYEONG CITY. All rights reserved.
          </p>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="absolute bottom-[68px] right-12 w-16 h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-2xl transition-all hover:-translate-y-2 z-50"
      >
        <ArrowUp size={28} />
      </button>
    </footer>
  );
}

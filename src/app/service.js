"use client";
import React, { useEffect, useRef, useState } from "react";
import "./service.css";

export default function Service() {
  const wrapperRef = useRef(null);
  const panelRef = useRef(null);
  const slide1Ref = useRef(null);
  const slide2Ref = useRef(null);
  const slide3Ref = useRef(null);

  const [activeSlide, setActiveSlide] = useState(0);

  /* 슬라이드 전환 (스크롤 진행도 기반) */
  useEffect(() => {
    const wrapper = wrapperRef.current;
    const slides = [slide1Ref.current, slide2Ref.current, slide3Ref.current];
    if (!wrapper || !slides.every(Boolean)) return;

    const onScroll = () => {
      const rect = wrapper.getBoundingClientRect();
      const scrollable = wrapper.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;

      const progress = Math.min(1, Math.max(0, -rect.top / scrollable));
      const idx = Math.min(2, Math.floor(progress * 3));
      setActiveSlide(idx);
      slides.forEach((slide, i) => slide.classList.toggle("is-visible", i === idx));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* 섹션이 뷰포트에 들어올 때만 glass 애니메이션 시작 */
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) wrapper.classList.add("entered");
          else wrapper.classList.remove("entered");
        });
      },
      { threshold: 0.1, root: null, rootMargin: "0px" }
    );

    io.observe(wrapper);
    return () => io.disconnect();
  }, []);

  const scrollToSlide = (index) => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const scrollable = wrapper.scrollHeight - window.innerHeight;
    const target = wrapper.offsetTop + (index / 3) * scrollable;
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <section id="service" className="service-wrapper" ref={wrapperRef}>
      <div className="sticky-panel" ref={panelRef}>
        {/* ============ SLIDE 1 ============ */}
        <div className="service-slide slide-1 is-visible" ref={slide1Ref}>
          <div className="service-content-box">
            <img src="/slide_1.svg" alt="슬라이드 1" className="layer-bg" />

            {/* 글래스 카드 */}
            <div className="glass-card">
              <span className="spec" aria-hidden />
              <span className="shine" aria-hidden />
            </div>

            {/* letterFront.svg — 최상단 레이어 */}
            <img
              src="/letterFront.png"
              alt="편지 앞면"
              className="letter-front"
            />
          </div>
        </div>

        {/* ============ SLIDE 2 ============ */}
        <div className="service-slide slide-2" ref={slide2Ref}>
          <div className="service-content-box">
            {/* <img src="/slide_2.png" alt="슬라이드 2" className="layer-bg" /> */}
            <div class="service_contents__paragraph">
              <h2>지역과 함께 만드는 경험</h2>
              <span>
                호스트가 직접 기획한 봉사활동, 창작 워크숍, 커뮤니티 미션을 통해{" "}
                <br />
                게스트가 지역의 삶과 문화를 몸소 경험하고 교류할 수 있어요.
              </span>
            </div>
            <img src="/slide2-mockup.png" alt="iPhone Mockup" />
          </div>
        </div>

        {/* ============ SLIDE 3 ============ */}
        <div className="service-slide slide-3" ref={slide3Ref}>
          <div className="service-content-box">
            {/* <img src="/slide_3.png" alt="슬라이드 3" className="layer-bg" /> */}
            <div className="service_contents__paragraph" id="service_contents__paragraph3">
              <h2>참여로 쌓고, 지역에 돌려주는 로컬 포인트</h2>
              <span>
                봉사활동이나 프로그램 참여로 로컬 포인트를 적립해요. 모은
                포인트는 <br />
                지역 식당, 카페, 편의시설에서 사용되어 작은 소비가 지역의
                활력으로 이어집니다.
              </span>
            </div>
            <div class="slide3-gradient"></div>
            <img src="/slide3-mockup.png" alt="iPhone Mockup" />
            <img class="slide3-coin" src="/slide3-coin.png" alt="coin 3d graphic" />
          </div>
        </div>

        {/* ============ DOT NAV ============ */}
        <div className="service-dots">
          <div
            className={`dot ${activeSlide === 0 ? "active" : ""}`}
            onClick={() => scrollToSlide(0)}
            aria-label="슬라이드 1"
          />
          <div
            className={`dot ${activeSlide === 1 ? "active" : ""}`}
            onClick={() => scrollToSlide(1)}
            aria-label="슬라이드 2"
          />
          <div
            className={`dot ${activeSlide === 2 ? "active" : ""}`}
            onClick={() => scrollToSlide(2)}
            aria-label="슬라이드 3"
          />
        </div>
      </div>
    </section>
  );
}

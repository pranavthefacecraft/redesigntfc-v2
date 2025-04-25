import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { CustomEase } from "gsap/CustomEase";
import LocomotiveScroll from "locomotive-scroll";

gsap.registerPlugin(Flip);
gsap.registerPlugin(CustomEase); // <-- Add this line
CustomEase.create("cubic", "0.83, 0, 0.17, 1");

const rotationValues = [10, -5, 2, -2];

function ImgGallery() {
  const galleryRef = useRef(null);
  const imagesRef = useRef([]);
  const scrollerRef = useRef(null);
  const isFlippedRef = useRef(false);

  useEffect(() => {
    scrollerRef.current = new LocomotiveScroll({
      el: document.querySelector("[data-scroll-container]"),
      smooth: false,
    });

    function applyRotation() {
      imagesRef.current.forEach((img, index) => {
        const rotation = isFlippedRef.current ? 0 : rotationValues[index];
        gsap.to(img, {
          rotate: rotation,
          duration: 2,
          ease: "cubic",
          delay: 0,
        });
      });
    }

    function animateGallery() {
      if (!isFlippedRef.current) {
        isFlippedRef.current = true;

        let state = Flip.getState([galleryRef.current, ...imagesRef.current]);
        galleryRef.current.classList.toggle("order");
        imagesRef.current.forEach((img) => img.classList.toggle("reorder"));

        Flip.from(state, {
          absolute: true,
          duration: 2,
          rotate: 0,
          stagger: 0.05,
          ease: "cubic",
          onStart: () => {
            applyRotation();
          },
          onComplete: () => {
            scrollerRef.current && scrollerRef.current.update();
          },
        });
      }
    }

    function onScroll() {
      const galleryRect = galleryRef.current.getBoundingClientRect();
      if (
        galleryRect.top < window.innerHeight &&
        galleryRect.bottom > 0
      ) {
        animateGallery();
      }
    }

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      scrollerRef.current && scrollerRef.current.destroy();
    };
  }, []);

  return (
    <div className="img-gallery" data-scroll-container>
      <div className="img-gallery-container order" data-scroll ref={galleryRef}>
        {[1, 2, 3, 4].map((_, idx) => (
          <div
            className="img reorder"
            key={idx}
            ref={el => imagesRef.current[idx] = el}
          >
            <img src={`/assets/photovideoanimation/gallery-${(idx % 2) + 1}.png`} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImgGallery;
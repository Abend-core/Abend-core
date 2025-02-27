<template>
  <div>
    <div class="page-container">
      <div class="section-wrapper" ref="heroRef">
        <HeroSection />
      </div>
      <div class="section-wrapper" ref="utilisationRef">
        <UtilisationExemple />
      </div>
      <div class="section-wrapper" ref="infosRef">
        <InfosSection />
      </div>
      <div class="section-wrapper" ref="numbersRef">
        <KeyNumbers />
      </div>
      <div class="section-wrapper" ref="visitedRef">
        <MostVisited />
      </div>
      <div class="section-wrapper" ref="aboutRef">
        <AboutUs />
      </div>
    </div>
    <MoreModules />
    <button v-if="showScrollTop" @click="scrollToTop" class="scroll-top-btn">
      ↑ Haut
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import HeroSection from "../components/home/HeroSection.vue";
import UtilisationExemple from "../components/home/UtilisationExemple.vue";
import InfosSection from "../components/home/InfosSection.vue";
import KeyNumbers from "../components/home/KeyNumbers.vue";
import MostVisited from "../components/home/MostVisited.vue";
import AboutUs from "../components/home/AboutUs.vue";
import MoreModules from "../components/home/MoreModules.vue";

const heroRef = ref(null);
const utilisationRef = ref(null);
const infosRef = ref(null);
const numbersRef = ref(null);
const visitedRef = ref(null);
const aboutRef = ref(null);
const showScrollTop = ref(false);

let observer = null;

onMounted(() => {
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const callback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  };

  observer = new IntersectionObserver(callback, options);

  const sectionRefs = [
    heroRef,
    utilisationRef,
    infosRef,
    numbersRef,
    visitedRef,
    aboutRef,
  ];

  sectionRefs.forEach((ref) => {
    if (ref.value) {
      observer.observe(ref.value);
    }
  });

  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
  window.removeEventListener("scroll", handleScroll);
});

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const handleScroll = () => {
  showScrollTop.value = window.scrollY > 300;
};
</script>

<style scoped>
.page-container {
  position: relative;
}

.section-wrapper {
  opacity: 0;
  transform: translateY(50px);
  transition: all 0.6s ease-out;
}

.section-wrapper.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.rotate-svg3 {
  animation: rotateLoop 3s infinite linear;
}

.scroll-top-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px 20px;
  background-color: #f82b30;
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-size: 16px;
  opacity: 0.8;
  transition: opacity 0.3s ease;
}

@keyframes rotateLoop {
  0% {
    transform: rotate(0deg) translateY(0px);
  }
  25% {
    transform: rotate(0deg) translateY(-20px);
  }
  50% {
    transform: rotate(180deg) translateY(-20px);
  }
  75% {
    transform: rotate(360deg) translateY(-20px);
  }
  100% {
    transform: rotate(0deg) translateY(0px);
  }
}
</style>

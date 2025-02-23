<template>
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
  <Footer />
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
import Footer from "../layouts/Footer.vue";

const heroRef = ref(null);
const utilisationRef = ref(null);
const infosRef = ref(null);
const numbersRef = ref(null);
const visitedRef = ref(null);
const aboutRef = ref(null);

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
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});
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

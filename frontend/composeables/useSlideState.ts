import { ref } from 'vue';

const currentSlide = ref(1);

const useSlideState = () => {
  const adjustSlide = (direction: number) => {
    const newSlide = currentSlide.value + direction;
    if (newSlide < 1) return; // Prevent going below 1
    currentSlide.value = newSlide;
    console.log('adjustSlide', direction);
  };

  return {
    currentSlide,
    adjustSlide,
  };
};
export default useSlideState;

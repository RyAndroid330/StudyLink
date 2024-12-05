export const useAppStore = defineStore('app', () => {
  const currentSection = ref('home');
  function setCurrentSection(section: string) {
    currentSection.value = section;
  }
  return {
    currentSection,
    setCurrentSection
  };
});

import fgInput from './components/UIComponents/Inputs/formGroupInput.vue';
import DropDown from './components/UIComponents/Dropdown.vue';
import Loader from './components/UIComponents/Loader.vue';
import BackButton from './components/UIComponents/BackButton.vue';
/**
 * You can register global components here and use them as a plugin in your main Vue instance
 */

const GlobalComponents = {
  install(Vue) {
    Vue.component('fg-input', fgInput);
    Vue.component('drop-down', DropDown);
    Vue.component('loader', Loader);
    Vue.component('back-button', BackButton);
  }
};

export default GlobalComponents;

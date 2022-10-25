import { ref } from "vue";
let DialogState = ref(false);
let LeftDrawerState = ref(false);
let FilterDialogState = ref(false);

const TogglePmDialogState = () => {
  DialogState.value = !DialogState.value;
};

const ToggleLeftDrawer = () => {
  LeftDrawerState.value = !LeftDrawerState.value;
};

const ToggleFilterDialogState = () => {
  FilterDialogState.value = !FilterDialogState.value;
};
/**
 * Export  DialogState as readonly (real time copy of Dialog)
 */
export {
  DialogState,
  TogglePmDialogState,
  LeftDrawerState,
  ToggleLeftDrawer,
  FilterDialogState,
  ToggleFilterDialogState,
};

import { ref, readonly } from "vue";
import axios from "axios";

let Menu = ref([]);
let MenuList = readonly(Menu);

let Category = ref([]);

let pathlink = "http://localhost/Ceas Cafe Quasar/src/php/Ceas/API.php";

let storeTaskID = ref(null);

const SetMenu = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .get(pathlink)
      .then((response) => {
        console.log(response.data);
        Menu.value = response.data.data;
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const SetCategories = (payload) => {
  console.log("payload", payload);
  return new Promise((resolve, reject) => {
    axios
      .get(pathlink, { params: { query: payload } })
      .then((response) => {
        console.log(response.data);
        Category.value = response.data.data;
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const SearchTasks = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .get(pathlink, {
        params: payload,
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const AddTaskTime = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .post(pathlink, payload)
      .then((response) => {
        console.log(response.data);
        if (response.data.status === "success") {
          taskTimeSheet.value.unshift(getDetails(response.data.data, 0));

          taskTimeSheet.value.forEach((t) => {
            if (t.ticket === response.data.data[0].ticket_number) {
              t.taskStatus = response.data.data[0].status;
            }
          });
        }
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const UpdateTaskTime = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .put(pathlink, payload)
      .then((response) => {
        console.log(response.data);
        if (response.data.status === "success") {
          let objectIndex = taskTimeSheet.value.findIndex(
            (e) => e.id === payload.id
          );

          if (objectIndex !== -1) {
            taskTimeSheet.value[objectIndex] = getDetails(
              response.data.data,
              0
            );
          }

          taskTimeSheet.value.forEach((t) => {
            if (t.work_task_id === response.data.data.work_task_id) {
              t.status = response.data.data.status;
            }
          });
        }

        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const DeleteTaskTime = (payload) => {
  payload.forEach((id) => {
    let objectIndex = taskTimeSheet.value.findIndex((e) => e.id === id);
    console.log(objectIndex);
    // if index not found (-1) delete nothing !
    objectIndex !== -1 && taskTimeSheet.value.splice(objectIndex, 1);
  });
};

export {
  storeTaskID,
  MenuList,
  Category,
  SetMenu,
  SetCategories,
  SearchTasks,
  AddTaskTime,
  UpdateTaskTime,
  DeleteTaskTime,
};

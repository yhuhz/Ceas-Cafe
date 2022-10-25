import { ref, readonly } from "vue";
import axios from "axios";
let Search = ref([]);
let SearchList = readonly(Search);
const path = "http://localhost/pixel8/qa/ojt-training-repo/php/";
let GetSearchResult = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .get(path + payload.endpoint, {
        params: payload.params,
      })
      .then((response) => {
        // Pass response data to SearchList container
        Search.value = response.data.data;
        console.log(SearchList.value);

        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export { SearchList, GetSearchResult };

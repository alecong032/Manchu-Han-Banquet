// import { SSTConfig } from "sst";
// import { API } from "./stacks/MyStack";

// export default {
//   config(_input) {
//     return {
//       name: "notes",
//       region: "us-east-1",
//     };
//   },
//   stacks(app) {
//     app.stack(API);
//   }
// } satisfies SSTConfig;
import { SSTConfig } from "sst";
import { StorageStack } from "./stacks/StorageStack";
import { ApiStack } from "./stacks/ApiStack";
import { Auth } from "sst/constructs";
import { AuthStack } from "./stacks/AuthStack";

export default {
  config(_input) {
    return {
      name: "notes",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(StorageStack).stack(ApiStack).stack(AuthStack);
  },
} satisfies SSTConfig;
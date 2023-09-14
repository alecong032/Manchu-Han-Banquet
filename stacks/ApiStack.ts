import { Api, StackContext, use } from "sst/constructs";
import { StorageStack } from "./StorageStack";

export function ApiStack({ stack }: StackContext) {
  const { table } = use(StorageStack);

  // Create the API
  const api = new Api(stack, "Api", {
    defaults: {
      authorizer: "iam",
      function: {
        bind: [table],
      },
    },
    routes: {
      //create note
      "POST /notes": "packages/functions/src/create.main",
      //get note
      "GET /notes/{id}": "packages/functions/src/get.main",
      //list notes
      "GET /notes": "packages/functions/src/list.main",
      //update notes
      "PUT /notes/{id}": "packages/functions/src/update.main",
      //delete notes
      "DELETE /notes/{id}": "packages/functions/src/delete.main",
    },
  });

  // Show the API endpoint in the output
  stack.addOutputs({
    ApiEndpoint: api.url,
  });

  // Return the API resource
  return {
    api,
  };
}
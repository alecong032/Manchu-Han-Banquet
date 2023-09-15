import { Api, Config, StackContext, use } from "sst/constructs";
import { StorageStack } from "./StorageStack";


export function ApiStack({ stack }: StackContext) {
  //API connect/access to dymonoDb  
  const { table } = use(StorageStack);

  //API connect/access to secrety 
  const STRIPE_SECRET_KEY = new Config.Secret(stack, "STRIPE_SECRET_KEY");

  // Create the API
  const api = new Api(stack, "Api", {
    defaults: {
    //Identity Access and Management
      authorizer: "iam",
      function: {
        bind: [table, STRIPE_SECRET_KEY],
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
      //billing 
      "POST /billing": "packages/functions/src/billing.main",

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
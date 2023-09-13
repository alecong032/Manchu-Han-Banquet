import { StackContext, Table } from "sst/constructs";
import { Bucket, StackContext, Table } from "sst/constructs";

export function StorageStack({ stack }: StackContext) {
  //create an S3 bucket
  const bucket = new Bucket(stack, "Uploads");

   // Create the DynamoDB table
  const table = new Table(stack, "Notes", {
    fields: {
      userId: "string",
      noteId: "string",
    },
    primaryIndex: { partitionKey: "userId", sortKey: "noteId" },
  });

  return {
    bucket,
    table,
  };
}

//"noteId":"01c03a20-4e96-11ee-b122-1d73d250a3a6"
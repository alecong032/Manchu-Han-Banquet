import { Storage } from "aws-amplify";
import { onError } from "./errorLib";

export async function s3Upload(file: File) {
  const filename = `${Date.now()}-${file.name}`;

  const stored = await Storage.vault.put(filename, file, {
    contentType: file.type,
  });

  return stored.key;
}

export async function s3Delete(key: any) {
        return( async() =>{
             try {
                await Storage.vault.remove(key)
            } catch (e) {
                onError(e);
            }
        }
           
        )   
 
}
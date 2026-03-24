import { runScript } from "@/utils/GoogleScriptAPI";
import { mergeName, formatFirstName, formatLastName } from "@/utils/SheetFile";

interface RiseResponse {
  success: boolean;
  message: string;
}

async function addRise(
  firstName: string,
  lastName: string,
  date: string,
  time: string,
  course: string,
  boost1: string,
  boost2: string,
  boost3: string,
  comment: string,
): Promise<boolean> {
  firstName = formatFirstName(firstName);
  lastName = formatLastName(lastName);

  const result = (await runScript("addRise", [
    mergeName(firstName, lastName),
    date,
    time,
    course,
    boost1,
    boost2,
    boost3,
    comment,
  ])) as RiseResponse;

  if (result.success) {
    console.log(`✅ ${result.message}`);
  } else {
    console.error(`❌ ${result.message}`);
  }

  return result.success;
}

export { addRise };

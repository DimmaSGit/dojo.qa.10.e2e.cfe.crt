import { getRandomString } from "../../utils/utils";
const availableThemes = ["general", "bug", "feature", "account"];
const availablePriorities = ["low", "medium", "high"];

export function getUserData(
  allFields: boolean,
  requiredFieldsOnly: boolean,
  notRequiredFieldsOnly: boolean,
) {
    if (allFields) {
        return allFieldsData;
 }
    if (requiredFieldsOnly) {
        return requiredFieldsData;
 }
        return notRequiredFieldsData;
 }
    
export const allFieldsData = {
    name: `User ${getRandomString(5)}`,
    email: `${getRandomString(5)}@example.com`,
    message: `This is a test message ${getRandomString(10)}`,
    theme: availableThemes[1],
    subject: getRandomString(7),
    priority: availablePriorities[2],
    attachment: "resources/images/positive.png",
    obtainCopy: true,
};

 const cloneData = (data: any) => JSON.parse(JSON.stringify(data));

export const requiredFieldsData = cloneData(allFieldsData);
 requiredFieldsData.subject = '';
 requiredFieldsData.priority = '';
 requiredFieldsData.attachment = '';
 requiredFieldsData.obtainCopy = false;

export const notRequiredFieldsData = cloneData(allFieldsData);
 notRequiredFieldsData.name = '';
 notRequiredFieldsData.email = '';
 notRequiredFieldsData.message = '';
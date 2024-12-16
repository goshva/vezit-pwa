export const createObjectFromArray = (fieldMapping, fieldNames) => {
    if (!fieldMapping) {
      console.warn("Invalid fieldMapping or fieldNames provided");
      return;
    }
    Object.keys(fieldMapping).forEach((key) => {
      fieldNames.value[fieldMapping[key]] = "";
    });
  };
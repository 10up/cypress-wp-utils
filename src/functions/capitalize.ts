export const capitalize = (str: string, lower = true) =>
  (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, match =>
    match.toUpperCase()
  );

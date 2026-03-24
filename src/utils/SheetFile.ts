function mergeName(firstName: string, lastName: string): string {
  return [firstName, lastName].join(" ");
}

function formatFirstName(name: string): string {
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}

function formatLastName(name: string): string {
  return name.toUpperCase();
}

export { mergeName, formatFirstName, formatLastName };

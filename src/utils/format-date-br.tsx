export function formatDateBR(dateInput: string | Date) {
  const date = dateInput instanceof Date ? dateInput : new Date(dateInput);

  const hours = date.toLocaleString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const day = date.toLocaleString("pt-BR", { day: "2-digit" });
  const month = date.toLocaleString("pt-BR", { month: "2-digit" });
  const year = date.toLocaleString("pt-BR", { year: "numeric" });

  return `${hours} | ${day}/${month}/${year}`;
}

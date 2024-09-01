export const scrollToBottom = (id: string) => {
  const container = document.getElementById(id)!;
  container.scrollTop = container.scrollHeight;
};
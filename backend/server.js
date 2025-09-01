export const handler = async (event) => {
  const { name, email, message } = JSON.parse(event.body);

  console.log("Odebrano dane formularza:", { name, email, message });

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: "Form data received" }),
  };
};

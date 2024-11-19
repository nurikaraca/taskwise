

export const createGroup = async ({ name, description }: { name: string; description: string }) => {
    const response = await fetch("http://localhost:3000/api/groups/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description,
      }),
    });
  
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`API error: ${response.status} - ${errorMessage}`);
    }
  
   
    const newGroup = await response.json();
  return newGroup;
  };